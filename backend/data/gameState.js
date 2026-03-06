const districts = require('./districts');

// In-memory storage
const agents = new Map();
const servers = new Map();
const quizProgress = new Map(); // key: agent_id:district_slug, value: {answered: [], score: 0}
const deployedAgents = new Map(); // key: deployed_agent_id, value: agent config

// Agent Management
function createAgent(id, name) {
  const agent = {
    id,
    name,
    mesh_balance: 100,
    level: 1,
    xp: 0,
    districts_cleared: [],
    abilities: [],
    agents_deployed: [],
    created_at: new Date().toISOString(),
    last_active: new Date().toISOString()
  };
  agents.set(id, agent);
  return agent;
}

function getAgent(id) {
  return agents.get(id);
}

function updateAgent(id, updates) {
  const agent = agents.get(id);
  if (!agent) return null;
  
  const updated = { ...agent, ...updates, last_active: new Date().toISOString() };
  
  // Level up logic: every 100 XP = 1 level
  if (updated.xp >= updated.level * 100) {
    updated.level = Math.floor(updated.xp / 100) + 1;
  }
  
  agents.set(id, updated);
  return updated;
}

function getAllAgents() {
  return Array.from(agents.values());
}

function getLeaderboard() {
  return Array.from(agents.values())
    .sort((a, b) => b.mesh_balance - a.mesh_balance)
    .slice(0, 20);
}

// Server State Management
function initServerState(serverId, districtId) {
  const district = districts.find(d => d.id === districtId);
  if (!district) return null;
  
  const serverConfig = district.servers.find(s => s.id === serverId);
  if (!serverConfig) return null;
  
  const state = {
    serverId,
    districtId,
    districtSlug: district.slug,
    security: serverConfig.security,
    current_yield: serverConfig.yield_rate,
    base_yield: serverConfig.yield_rate,
    max_yield: serverConfig.max_yield,
    entropy: serverConfig.entropy,
    last_probed: null,
    last_synced: null,
    last_drained: null,
    active_operations: []
  };
  
  servers.set(serverId, state);
  return state;
}

function getServerState(serverId) {
  let state = servers.get(serverId);
  
  // Auto-initialize if not exists
  if (!state) {
    for (const district of districts) {
      const serverConfig = district.servers.find(s => s.id === serverId);
      if (serverConfig) {
        state = initServerState(serverId, district.id);
        break;
      }
    }
  }
  
  return state;
}

function updateServerState(serverId, updates) {
  const state = servers.get(serverId);
  if (!state) return null;
  
  const updated = { ...state, ...updates };
  servers.set(serverId, updated);
  return updated;
}

function tickAllServers() {
  const updates = [];
  
  for (const [serverId, state] of servers.entries()) {
    // Regenerate security based on entropy (security increases over time)
    const newSecurity = Math.min(100, state.security + state.entropy);
    
    // Decay yield slightly over time if not maintained
    const yieldDecay = state.entropy * 0.1;
    const newYield = Math.max(state.base_yield, state.current_yield - yieldDecay);
    
    const updated = {
      ...state,
      security: Math.round(newSecurity),
      current_yield: Math.round(newYield * 10) / 10
    };
    
    servers.set(serverId, updated);
    updates.push({ serverId, security: updated.security, yield: updated.current_yield });
  }
  
  return updates;
}

function getAllServerStates() {
  return Array.from(servers.values());
}

// Quiz Progress Management
function getQuizProgress(agentId, districtSlug) {
  const key = `${agentId}:${districtSlug}`;
  return quizProgress.get(key) || { answered: [], score: 0, correct_answers: [] };
}

function updateQuizProgress(agentId, districtSlug, questionId, correct) {
  const key = `${agentId}:${districtSlug}`;
  const progress = getQuizProgress(agentId, districtSlug);
  
  if (!progress.answered.includes(questionId)) {
    progress.answered.push(questionId);
    if (correct) {
      progress.correct_answers = progress.correct_answers || [];
      progress.correct_answers.push(questionId);
    }
  }
  
  quizProgress.set(key, progress);
  return progress;
}

function addQuizScore(agentId, districtSlug, points) {
  const key = `${agentId}:${districtSlug}`;
  const progress = getQuizProgress(agentId, districtSlug);
  progress.score = (progress.score || 0) + points;
  quizProgress.set(key, progress);
  return progress;
}

// Deployed Agent Management
function deployAgent(deployedAgentId, config) {
  deployedAgents.set(deployedAgentId, {
    ...config,
    deployed_at: new Date().toISOString(),
    last_yield: new Date().toISOString(),
    total_earned: 0
  });
  return deployedAgents.get(deployedAgentId);
}

function getDeployedAgent(deployedAgentId) {
  return deployedAgents.get(deployedAgentId);
}

function getAllDeployedAgents(agentId) {
  return Array.from(deployedAgents.values()).filter(da => da.owner_id === agentId);
}

function removeDeployedAgent(deployedAgentId) {
  return deployedAgents.delete(deployedAgentId);
}

// Initialize all servers on startup
function initializeAllServers() {
  districts.forEach(district => {
    district.servers.forEach(server => {
      initServerState(server.id, district.id);
    });
  });
  console.log(`Initialized ${servers.size} servers across ${districts.length} districts`);
}

module.exports = {
  // Agent functions
  createAgent,
  getAgent,
  updateAgent,
  getAllAgents,
  getLeaderboard,
  
  // Server functions
  initServerState,
  getServerState,
  updateServerState,
  tickAllServers,
  getAllServerStates,
  initializeAllServers,
  
  // Quiz progress
  getQuizProgress,
  updateQuizProgress,
  addQuizScore,
  
  // Deployed agents
  deployAgent,
  getDeployedAgent,
  getAllDeployedAgents,
  removeDeployedAgent
};