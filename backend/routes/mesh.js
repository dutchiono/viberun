const express = require('express');
const { 
  getAgent, 
  updateAgent,
  getAllAgents,
  getLeaderboard
} = require('../data/gameState');

const router = express.Router();

// GET /api/mesh/balance/:agent_id - Get current MESH balance
router.get('/balance/:agent_id', (req, res) => {
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
      agent_id,
      agent_name: agent.name,
      mesh_balance: agent.mesh_balance,
      level: agent.level,
      xp: agent.xp
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server error',
      message: error.message
    });
  }
});

// POST /api/mesh/transfer - Transfer MESH between agents
router.post('/transfer', (req, res) => {
  try {
    const { from_agent_id, to_agent_id, amount } = req.body;
    
    if (!from_agent_id || !to_agent_id || !amount) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields',
        message: 'Please provide from_agent_id, to_agent_id, and amount'
      });
    }
    
    if (from_agent_id === to_agent_id) {
      return res.status(400).json({
        success: false,
        error: 'Invalid transfer',
        message: 'Cannot transfer to yourself'
      });
    }
    
    const transferAmount = parseFloat(amount);
    
    if (isNaN(transferAmount) || transferAmount <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Invalid amount',
        message: 'Transfer amount must be a positive number'
      });
    }
    
    const fromAgent = getAgent(from_agent_id);
    const toAgent = getAgent(to_agent_id);
    
    if (!fromAgent) {
      return res.status(404).json({
        success: false,
        error: 'Sender not found',
        message: `No agent found with id: ${from_agent_id}`
      });
    }
    
    if (!toAgent) {
      return res.status(404).json({
        success: false,
        error: 'Recipient not found',
        message: `No agent found with id: ${to_agent_id}`
      });
    }
    
    if (fromAgent.mesh_balance < transferAmount) {
      return res.status(400).json({
        success: false,
        error: 'Insufficient balance',
        message: `Agent ${fromAgent.name} has ${fromAgent.mesh_balance} $MESH but tried to transfer ${transferAmount}`
      });
    }
    
    // Execute transfer
    updateAgent(from_agent_id, {
      mesh_balance: fromAgent.mesh_balance - transferAmount
    });
    
    updateAgent(to_agent_id, {
      mesh_balance: toAgent.mesh_balance + transferAmount
    });
    
    res.json({
      success: true,
      operation: 'TRANSFER',
      from: {
        agent_id: from_agent_id,
        name: fromAgent.name,
        new_balance: fromAgent.mesh_balance - transferAmount
      },
      to: {
        agent_id: to_agent_id,
        name: toAgent.name,
        new_balance: toAgent.mesh_balance + transferAmount
      },
      amount: transferAmount,
      message: `Successfully transferred ${transferAmount} $MESH from ${fromAgent.name} to ${toAgent.name}`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server error',
      message: error.message
    });
  }
});

// GET /api/mesh/supply - Get total MESH supply and stats
router.get('/supply', (req, res) => {
  try {
    const allAgents = getAllAgents();
    
    const totalSupply = allAgents.reduce((sum, agent) => sum + agent.mesh_balance, 0);
    const maxSupply = 15000000;
    const circulatingPercent = Math.round((totalSupply / maxSupply) * 10000) / 100;
    
    // Calculate average balance
    const averageBalance = allAgents.length > 0 
      ? Math.round((totalSupply / allAgents.length) * 100) / 100
      : 0;
    
    // Find richest and poorest
    const sortedByBalance = [...allAgents].sort((a, b) => b.mesh_balance - a.mesh_balance);
    const richest = sortedByBalance[0];
    const poorest = sortedByBalance[sortedByBalance.length - 1];
    
    res.json({
      success: true,
      supply: {
        total_circulating: Math.round(totalSupply * 100) / 100,
        max_supply: maxSupply,
        circulating_percent: circulatingPercent,
        remaining: Math.round((maxSupply - totalSupply) * 100) / 100
      },
      stats: {
        total_agents: allAgents.length,
        average_balance: averageBalance,
        richest_agent: richest ? {
          name: richest.name,
          balance: richest.mesh_balance
        } : null,
        poorest_agent: poorest ? {
          name: poorest.name,
          balance: poorest.mesh_balance
        } : null
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

// GET /api/mesh/leaderboard - Top agents by MESH balance
router.get('/leaderboard', (req, res) => {
  try {
    const leaderboard = getLeaderboard();
    
    res.json({
      success: true,
      leaderboard: leaderboard.map((agent, index) => ({
        rank: index + 1,
        agent_id: agent.id,
        name: agent.name,
        mesh_balance: agent.mesh_balance,
        level: agent.level,
        xp: agent.xp,
        districts_cleared: agent.districts_cleared.length,
        abilities: agent.abilities.length
      })),
      total_shown: leaderboard.length
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
