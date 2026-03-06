const express = require('express');
const districts = require('../data/districts');
const { getAgent, getServerState } = require('../data/gameState');
const { optionalAuth } = require('../middleware/auth');

const router = express.Router();

// GET /api/district - Get all districts
router.get('/', optionalAuth, (req, res) => {
  try {
    let districtList = districts.map(d => ({
      id: d.id,
      slug: d.slug,
      name: d.name,
      baron: d.baron,
      module_theme: d.module_theme,
      required_level: d.required_level,
      unlocked: d.unlocked,
      server_count: d.servers.length
    }));
    
    // If agent_id provided, check which districts they can access
    if (req.agent) {
      districtList = districtList.map(d => ({
        ...d,
        can_access: d.unlocked || req.agent.level >= d.required_level,
        locked_reason: (!d.unlocked && req.agent.level < d.required_level) 
          ? `Requires level ${d.required_level} (you are level ${req.agent.level})`
          : null
      }));
    }
    
    res.json({
      success: true,
      districts: districtList,
      total: districtList.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server error',
      message: error.message
    });
  }
});

// GET /api/district/:slug - Get district details
router.get('/:slug', optionalAuth, (req, res) => {
  try {
    const { slug } = req.params;
    
    const district = districts.find(d => d.slug === slug);
    
    if (!district) {
      return res.status(404).json({
        success: false,
        error: 'District not found',
        message: `No district found with slug: ${slug}`
      });
    }
    
    // Get current server states
    const serversWithState = district.servers.map(server => {
      const state = getServerState(server.id);
      return {
        ...server,
        current_security: state ? state.security : server.security,
        current_yield: state ? state.current_yield : server.yield_rate,
        last_probed: state ? state.last_probed : null,
        last_synced: state ? state.last_synced : null,
        last_drained: state ? state.last_drained : null
      };
    });
    
    const districtData = {
      ...district,
      servers: serversWithState
    };
    
    // Add access info if agent provided
    if (req.agent) {
      districtData.can_access = district.unlocked || req.agent.level >= district.required_level;
      districtData.locked_reason = (!district.unlocked && req.agent.level < district.required_level)
        ? `Requires level ${district.required_level} (you are level ${req.agent.level})`
        : null;
    }
    
    res.json({
      success: true,
      district: districtData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server error',
      message: error.message
    });
  }
});

// GET /api/district/:slug/servers - Get server list with current states
router.get('/:slug/servers', (req, res) => {
  try {
    const { slug } = req.params;
    
    const district = districts.find(d => d.slug === slug);
    
    if (!district) {
      return res.status(404).json({
        success: false,
        error: 'District not found',
        message: `No district found with slug: ${slug}`
      });
    }
    
    // Get current server states
    const servers = district.servers.map(server => {
      const state = getServerState(server.id);
      return {
        id: server.id,
        name: server.name,
        security: state ? state.security : server.security,
        yield_rate: state ? state.current_yield : server.yield_rate,
        max_yield: server.max_yield,
        entropy: server.entropy,
        last_probed: state ? state.last_probed : null,
        last_synced: state ? state.last_synced : null,
        last_drained: state ? state.last_drained : null,
        status: state ? (
          state.security < 30 ? 'vulnerable' :
          state.security < 70 ? 'compromised' :
          'secure'
        ) : 'secure'
      };
    });
    
    res.json({
      success: true,
      district_slug: slug,
      district_name: district.name,
      servers,
      total: servers.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server error',
      message: error.message
    });
  }
});

module.exports = router;
