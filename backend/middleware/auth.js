const { getAgent } = require('../data/gameState');

// Simple authentication middleware
// Checks for agent_id in X-Agent-ID header or in request body
function authenticateAgent(req, res, next) {
  // Try to get agent_id from header first
  let agentId = req.headers['x-agent-id'];
  
  // If not in header, try body
  if (!agentId && req.body && req.body.agent_id) {
    agentId = req.body.agent_id;
  }
  
  // If not in body, try query params
  if (!agentId && req.query && req.query.agent_id) {
    agentId = req.query.agent_id;
  }
  
  // If still no agent_id, return 401
  if (!agentId) {
    return res.status(401).json({
      success: false,
      error: 'Authentication required',
      message: 'Please provide agent_id in X-Agent-ID header, query parameter, or request body'
    });
  }
  
  // Verify agent exists
  const agent = getAgent(agentId);
  if (!agent) {
    return res.status(404).json({
      success: false,
      error: 'Agent not found',
      message: `No agent found with id: ${agentId}`
    });
  }
  
  // Attach to request object for use in route handlers
  req.agentId = agentId;
  req.agent = agent;
  
  next();
}

// Optional authentication - doesn't fail if no agent_id provided
function optionalAuth(req, res, next) {
  let agentId = req.headers['x-agent-id'] || 
                (req.body && req.body.agent_id) || 
                (req.query && req.query.agent_id);
  
  if (agentId) {
    const agent = getAgent(agentId);
    if (agent) {
      req.agentId = agentId;
      req.agent = agent;
    }
  }
  
  next();
}

module.exports = {
  authenticateAgent,
  optionalAuth
};