const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { 
  createAgent, 
  getAgent, 
  getLeaderboard,
  getAllDeployedAgents 
} = require('../data/gameState');

const router = express.Router();

// POST /api/agent/register - Create a new agent
router.post('/register', (req, res) => {
  try {
    const { name } = req.body;
    
    if (!name || name.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Name is required',
        message: 'Please provide a name for your agent'
      });
    }
    
    // Generate unique agent ID
    const agentId = uuidv4();
    
    // Create agent
    const agent = createAgent(agentId, name.trim());
    
    res.status(201).json({
      success: true,
      agent_id: agentId,
      agent,
      token: agentId, // Token is just the agent_id for simplicity
      message: `Welcome to VIBE://RUN, ${agent.name}! You start with 100 $MESH tokens.`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server error',
      message: error.message
    });
  }
});

// GET /api/agent/:agent_id - Get agent details
router.get('/:agent_id', (req, res) => {
  try {
    const { agent_id } = req.params;
    
    const agent = getAgent(agent_id);
    
    if (!agent) {
      return res.status(404).json({
        success: false,
        error: 'Agent not found',
        message: `No agent found with id: ${agent_id}`
      });
    }
    
    res.json({
      success: true,
      agent
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server error',
      message: error.message
    });
  }
});

// GET /api/agent/:agent_id/status - Full agent status
router.get('/:agent_id/status', (req, res) => {
  try {
    const { agent_id } = req.params;
    
    const agent = getAgent(agent_id);
    
    if (!agent) {
      return res.status(404).json({
        success: false,
        error: 'Agent not found',
        message: `No agent found with id: ${agent_id}`
      });
    }
    
    // Get all deployed agents
    const deployedAgents = getAllDeployedAgents(agent_id);
    
    // Calculate total passive income
    const passiveIncome = deployedAgents.reduce((sum, da) => {
      return sum + (da.estimated_yield_per_minute || 0);
    }, 0);
    
    res.json({
      success: true,
      agent,
      deployed_agents: deployedAgents,
      passive_income_per_minute: Math.round(passiveIncome * 10) / 10,
      stats: {
        total_mesh: agent.mesh_balance,
        level: agent.level,
        xp: agent.xp,
        xp_to_next_level: (agent.level * 100) - agent.xp,
        districts_cleared: agent.districts_cleared.length,
        abilities_unlocked: agent.abilities.length,
        active_deployments: deployedAgents.length
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server error',
      message: error.message
    });
  }
});

// GET /api/agent/leaderboard - Top 20 agents by MESH balance
router.get('/leaderboard', (req, res) => {
  try {
    const leaderboard = getLeaderboard();
    
    res.json({
      success: true,
      leaderboard: leaderboard.map((agent, index) => ({
        rank: index + 1,
        id: agent.id,
        name: agent.name,
        mesh_balance: agent.mesh_balance,
        level: agent.level,
        districts_cleared: agent.districts_cleared.length
      })),
      total_agents: leaderboard.length
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
