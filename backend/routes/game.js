const express = require('express');
const { v4: uuidv4 } = require('uuid');
const districts = require('../data/districts');
const { 
  getAgent, 
  updateAgent, 
  getServerState, 
  updateServerState,
  tickAllServers,
  deployAgent: deployAgentToServer
} = require('../data/gameState');

const router = express.Router();

// POST /api/game/probe - Reduce server security
router.post('/probe', (req, res) => {
  try {
    const { agent_id, server_id, district_slug } = req.body;
    
    if (!agent_id || !server_id || !district_slug) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields',
        message: 'Please provide agent_id, server_id, and district_slug'
      });
    }
    
    const agent = getAgent(agent_id);
    if (!agent) {
      return res.status(404).json({
        success: false,
        error: 'Agent not found'
      });
    }
    
    // Check agent has enough MESH
    if (agent.mesh_balance < 10) {
      return res.status(400).json({
        success: false,
        error: 'Insufficient MESH',
        message: 'PROBE operation costs 10 $MESH. Current balance: ' + agent.mesh_balance
      });
    }
    
    const serverState = getServerState(server_id);
    if (!serverState) {
      return res.status(404).json({
        success: false,
        error: 'Server not found'
      });
    }
    
    // Random security reduction between 10-20
    const securityReduction = Math.floor(Math.random() * 11) + 10;
    const newSecurity = Math.max(0, serverState.security - securityReduction);
    
    // Update server state
    updateServerState(server_id, {
      security: newSecurity,
      last_probed: new Date().toISOString()
    });
    
    // Deduct MESH and award XP
    updateAgent(agent_id, {
      mesh_balance: agent.mesh_balance - 10,
      xp: agent.xp + 5
    });
    
    res.json({
      success: true,
      operation: 'PROBE',
      new_security: newSecurity,
      security_reduced: securityReduction,
      mesh_spent: 10,
      xp_earned: 5,
      message: `PROBE successful! Server security reduced from ${serverState.security} to ${newSecurity}`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server error',
      message: error.message
    });
  }
});

// POST /api/game/sync - Increase server yield rate
router.post('/sync', (req, res) => {
  try {
    const { agent_id, server_id, district_slug } = req.body;
    
    if (!agent_id || !server_id || !district_slug) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields',
        message: 'Please provide agent_id, server_id, and district_slug'
      });
    }
    
    const agent = getAgent(agent_id);
    if (!agent) {
      return res.status(404).json({
        success: false,
        error: 'Agent not found'
      });
    }
    
    const serverState = getServerState(server_id);
    if (!serverState) {
      return res.status(404).json({
        success: false,
        error: 'Server not found'
      });
    }
    
    // Check security requirement
    if (serverState.security >= 50) {
      return res.status(400).json({
        success: false,
        error: 'Security too high',
        message: `SYNC requires server security < 50. Current: ${serverState.security}. Use PROBE first.`
      });
    }
    
    // Check agent has enough MESH
    if (agent.mesh_balance < 20) {
      return res.status(400).json({
        success: false,
        error: 'Insufficient MESH',
        message: 'SYNC operation costs 20 $MESH. Current balance: ' + agent.mesh_balance
      });
    }
    
    // Increase yield by 5-15%
    const yieldIncrease = (Math.floor(Math.random() * 11) + 5) / 100;
    const newYield = Math.min(serverState.max_yield, serverState.current_yield * (1 + yieldIncrease));
    
    // Update server state
    updateServerState(server_id, {
      current_yield: Math.round(newYield * 10) / 10,
      last_synced: new Date().toISOString()
    });
    
    // Deduct MESH and award XP
    updateAgent(agent_id, {
      mesh_balance: agent.mesh_balance - 20,
      xp: agent.xp + 10
    });
    
    res.json({
      success: true,
      operation: 'SYNC',
      new_yield_rate: Math.round(newYield * 10) / 10,
      yield_increased: Math.round((newYield - serverState.current_yield) * 10) / 10,
      mesh_spent: 20,
      xp_earned: 10,
      message: `SYNC successful! Server yield increased from ${serverState.current_yield} to ${Math.round(newYield * 10) / 10}`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server error',
      message: error.message
    });
  }
});

// POST /api/game/drain - Extract MESH from server
router.post('/drain', (req, res) => {
  try {
    const { agent_id, server_id, district_slug } = req.body;
    
    if (!agent_id || !server_id || !district_slug) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields',
        message: 'Please provide agent_id, server_id, and district_slug'
      });
    }
    
    const agent = getAgent(agent_id);
    if (!agent) {
      return res.status(404).json({
        success: false,
        error: 'Agent not found'
      });
    }
    
    const serverState = getServerState(server_id);
    if (!serverState) {
      return res.status(404).json({
        success: false,
        error: 'Server not found'
      });
    }
    
    // Check security requirement
    if (serverState.security >= 30) {
      return res.status(400).json({
        success: false,
        error: 'Security too high',
        message: `DRAIN requires server security < 30. Current: ${serverState.security}. Use PROBE first.`
      });
    }
    
    // Calculate MESH earned based on yield and security
    const meshEarned = Math.round(serverState.current_yield * (1 - serverState.security / 100));
    
    // Update server state (increase security after drain)
    updateServerState(server_id, {
      security: Math.min(100, serverState.security + 15),
      last_drained: new Date().toISOString()
    });
    
    // Award MESH and XP
    updateAgent(agent_id, {
      mesh_balance: agent.mesh_balance + meshEarned,
      xp: agent.xp + 15
    });
    
    res.json({
      success: true,
      operation: 'DRAIN',
      mesh_earned: meshEarned,
      xp_earned: 15,
      new_balance: agent.mesh_balance + meshEarned,
      message: `DRAIN successful! Extracted ${meshEarned} $MESH. Security increased to ${Math.min(100, serverState.security + 15)}.`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server error',
      message: error.message
    });
  }
});

// POST /api/game/deploy-agent - Deploy autonomous agent
router.post('/deploy-agent', (req, res) => {
  try {
    const { agent_id, server_id, district_slug, script_type } = req.body;
    
    if (!agent_id || !server_id || !district_slug || !script_type) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields',
        message: 'Please provide agent_id, server_id, district_slug, and script_type'
      });
    }
    
    const validScripts = ['scout', 'vault', 'archivist', 'broker'];
    if (!validScripts.includes(script_type)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid script type',
        message: `script_type must be one of: ${validScripts.join(', ')}`
      });
    }
    
    const agent = getAgent(agent_id);
    if (!agent) {
      return res.status(404).json({
        success: false,
        error: 'Agent not found'
      });
    }
    
    const serverState = getServerState(server_id);
    if (!serverState) {
      return res.status(404).json({
        success: false,
        error: 'Server not found'
      });
    }
    
    // Deployment costs
    const deploymentCost = {
      scout: 50,
      vault: 100,
      archivist: 150,
      broker: 200
    };
    
    const cost = deploymentCost[script_type];
    
    if (agent.mesh_balance < cost) {
      return res.status(400).json({
        success: false,
        error: 'Insufficient MESH',
        message: `${script_type.toUpperCase()} deployment costs ${cost} $MESH. Current balance: ${agent.mesh_balance}`
      });
    }
    
    // Check server security (must be low to deploy)
    if (serverState.security > 50) {
      return res.status(400).json({
        success: false,
        error: 'Security too high',
        message: `Cannot deploy agent with server security > 50. Current: ${serverState.security}`
      });
    }
    
    // Calculate estimated yield
    const yieldMultiplier = {
      scout: 0.5,
      vault: 1.0,
      archivist: 1.5,
      broker: 2.0
    };
    
    const estimatedYield = Math.round(serverState.current_yield * yieldMultiplier[script_type] * 10) / 10;
    
    // Create deployed agent
    const deployedAgentId = uuidv4();
    deployAgentToServer(deployedAgentId, {
      id: deployedAgentId,
      owner_id: agent_id,
      server_id,
      district_slug,
      script_type,
      estimated_yield_per_minute: estimatedYield
    });
    
    // Update owner agent
    const updatedDeployments = [...agent.agents_deployed, deployedAgentId];
    updateAgent(agent_id, {
      mesh_balance: agent.mesh_balance - cost,
      agents_deployed: updatedDeployments
    });
    
    res.json({
      success: true,
      operation: 'DEPLOY',
      deployed_agent_id: deployedAgentId,
      script_type,
      server_id,
      mesh_spent: cost,
      estimated_yield_per_minute: estimatedYield,
      message: `${script_type.toUpperCase()} agent deployed successfully! Earning ~${estimatedYield} $MESH/min.`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server error',
      message: error.message
    });
  }
});

// GET /api/game/tick - Manually trigger game tick (for testing)
router.get('/tick', (req, res) => {
  try {
    const updates = tickAllServers();
    
    res.json({
      success: true,
      operation: 'TICK',
      servers_updated: updates.length,
      updates,
      message: 'Game tick processed successfully'
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
