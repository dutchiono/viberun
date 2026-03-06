const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');

// Import game state initializer
const { initializeAllServers, tickAllServers } = require('./data/gameState');

// Import routes
const agentRoutes = require('./routes/agent');
const districtRoutes = require('./routes/district');
const gameRoutes = require('./routes/game');
const quizRoutes = require('./routes/quiz');
const meshRoutes = require('./routes/mesh');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware - helmet
app.use(helmet());

// CORS - allow all origins for development
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Agent-ID']
}));

// Rate limiting - 100 requests per 15 minutes per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    success: false,
    error: 'Too many requests',
    message: 'Rate limit exceeded. Please try again in 15 minutes.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

app.use(limiter);

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Request logging middleware (simple)
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    game: 'VIBE://RUN',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    endpoints: {
      agent: '/api/agent',
      district: '/api/district',
      game: '/api/game',
      quiz: '/api/quiz',
      mesh: '/api/mesh'
    }
  });
});

// Mount API routes
app.use('/api/agent', agentRoutes);
app.use('/api/district', districtRoutes);
app.use('/api/game', gameRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/mesh', meshRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Not Found',
    message: `Route ${req.method} ${req.path} not found`,
    available_endpoints: [
      'GET /',
      'POST /api/agent/register',
      'GET /api/agent/:agent_id',
      'GET /api/agent/:agent_id/status',
      'GET /api/agent/leaderboard',
      'GET /api/district',
      'GET /api/district/:slug',
      'GET /api/district/:slug/servers',
      'POST /api/game/probe',
      'POST /api/game/sync',
      'POST /api/game/drain',
      'POST /api/game/deploy-agent',
      'GET /api/game/tick',
      'GET /api/quiz/:district_slug',
      'POST /api/quiz/:district_slug/answer',
      'GET /api/quiz/:district_slug/progress/:agent_id',
      'GET /api/mesh/balance/:agent_id',
      'POST /api/mesh/transfer',
      'GET /api/mesh/supply',
      'GET /api/mesh/leaderboard'
    ]
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'production' 
      ? 'An unexpected error occurred' 
      : err.message
  });
});

// Initialize game state
console.log('Initializing VIBE://RUN game servers...');
initializeAllServers();

// Start server tick loop (every 60 seconds)
const TICK_INTERVAL = 60000; // 60 seconds
setInterval(() => {
  console.log('Running game tick...');
  const updates = tickAllServers();
  console.log(`Updated ${updates.length} servers`);
}, TICK_INTERVAL);

// Start server
app.listen(PORT, () => {
  console.log('');
  console.log('==========================================' );
  console.log('         VIBE://RUN Backend Server        ');
  console.log('==========================================');
  console.log(`Server running on: http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Game tick interval: ${TICK_INTERVAL / 1000}s`);
  console.log('==========================================');
  console.log('');
  console.log('Available endpoints:');
  console.log(`  Health Check:  GET http://localhost:${PORT}/`);
  console.log(`  Agent API:     http://localhost:${PORT}/api/agent`);
  console.log(`  District API:  http://localhost:${PORT}/api/district`);
  console.log(`  Game API:      http://localhost:${PORT}/api/game`);
  console.log(`  Quiz API:      http://localhost:${PORT}/api/quiz`);
  console.log(`  MESH API:      http://localhost:${PORT}/api/mesh`);
  console.log('');
  console.log('Ready to accept connections...');
  console.log('==========================================');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  process.exit(0);
});

module.exports = app;