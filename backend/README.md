# VIBE://RUN - Game Backend

A Bitburner-inspired coding RPG where players infiltrate "The Mesh" - a network of 15 districts based on coding concepts. Players run PROBE/SYNC/DRAIN operations on servers to earn $MESH tokens and answer quiz questions to unlock abilities.

## Installation

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager

### Setup

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

The server will start on `http://localhost:3001` (or the port specified in `PORT` environment variable).

## Configuration

### Environment Variables
- `PORT` - Server port (default: 3001)
- `NODE_ENV` - Environment mode (development/production)

## API Endpoints

Base URL: `http://localhost:3001`

### Health Check
- `GET /` - Server status and available endpoints

### Agent Management (`/api/agent`)
- `POST /api/agent/register` - Register a new agent
  - Body: `{ "name": "Agent Name" }`
  - Returns: agent_id, agent object, and token

- `GET /api/agent/:agent_id` - Get agent details

- `GET /api/agent/:agent_id/status` - Get full agent status including deployed agents and stats

- `GET /api/agent/leaderboard` - Get top 20 agents by MESH balance

### District Management (`/api/district`)
- `GET /api/district` - List all 15 districts
  - Optional: `?agent_id=xxx` to check access levels

- `GET /api/district/:slug` - Get district details with current server states
  - Slugs: gitclave, vaultex, datacore, apihex, authwall, deploydock, npmfield, splitzone, staterift, errorgrave, cachepeak, ratelimb, flagfield, observatrix, indexvault

- `GET /api/district/:slug/servers` - Get server list with real-time states

### Game Operations (`/api/game`)

All operations require: `agent_id`, `server_id`, `district_slug`

- `POST /api/game/probe` - Reduce server security
  - Cost: 10 $MESH
  - Effect: Reduces security by 10-20 points
  - Reward: 5 XP

- `POST /api/game/sync` - Increase server yield rate
  - Cost: 20 $MESH
  - Requirement: Server security < 50
  - Effect: Increases yield by 5-15%
  - Reward: 10 XP

- `POST /api/game/drain` - Extract MESH from server
  - Requirement: Server security < 30
  - Effect: Earn MESH based on yield and security
  - Reward: 15 XP
  - Side effect: Security increases by 15 points

- `POST /api/game/deploy-agent` - Deploy autonomous agent
  - Body: `{ "agent_id", "server_id", "district_slug", "script_type" }`
  - Script types: scout (50 $MESH), vault (100), archivist (150), broker (200)
  - Requirement: Server security < 50
  - Effect: Passive MESH income every minute

- `GET /api/game/tick` - Manually trigger game tick (testing only)

### Quiz System (`/api/quiz`)
- `GET /api/quiz/:district_slug` - Get quiz questions (answers hidden)

- `POST /api/quiz/:district_slug/answer` - Submit an answer
  - Body: `{ "agent_id", "question_id", "answer" }`
  - Answer types:
    - Multiple choice: answer index (0, 1, 2, 3)
    - True/false: true or false
    - Open ended: text string (checked against keywords)
  - Rewards: MESH and XP for correct answers
  - Unlocks abilities when all questions completed

- `GET /api/quiz/:district_slug/progress/:agent_id` - Check quiz progress

### Token Economy (`/api/mesh`)
- `GET /api/mesh/balance/:agent_id` - Get current MESH balance

- `POST /api/mesh/transfer` - Transfer MESH between agents
  - Body: `{ "from_agent_id", "to_agent_id", "amount" }`

- `GET /api/mesh/supply` - Get total supply and economy stats
  - Max supply: 15,000,000 $MESH

- `GET /api/mesh/leaderboard` - Top 20 richest agents

## Game Mechanics

### Districts
15 districts based on coding concepts:
1. **GITCLAVE** - Git & Version Control (Level 5)
2. **VAULTEX** - Environment Variables (Level 10)
3. **DATACORE** - SQL & Databases (Level 15)
4. **APIHEX** - APIs & HTTP (Level 20)
5. **AUTHWALL** - Authentication & JWTs (Level 25)
6. **DEPLOYDOCK** - Deployment & DevOps (Level 30)
7. **NPMFIELD** - NPM & Packages (Level 35)
8. **SPLITZONE** - Frontend/Backend (Level 40)
9. **STATERIFT** - State Management (Level 45)
10. **ERRORGRAVE** - Error Handling (Level 50)
11. **CACHEPEAK** - Caching & Performance (Level 55)
12. **RATELIMB** - Rate Limiting (Level 60)
13. **FLAGFIELD** - Feature Flags (Level 65)
14. **OBSERVATRIX** - Logging & Observability (Level 70)
15. **INDEXVAULT** - Database Indexing (Level 75)

### Server States
Each district has 3 servers with:
- **Security** (0-100): Must be reduced to drain MESH
- **Yield Rate**: Amount of MESH that can be extracted
- **Entropy**: Rate at which security regenerates
- **Max Yield**: Maximum yield capacity

### Operations Flow
1. **PROBE** to reduce security
2. **SYNC** to increase yield (when security < 50)
3. **DRAIN** to extract MESH (when security < 30)
4. **DEPLOY** agents for passive income

### Leveling System
- Earn XP from operations and quizzes
- Level up every 100 XP
- Higher levels unlock new districts
- Starting balance: 100 $MESH

### Game Tick
Server runs automatic tick every 60 seconds:
- Server security regenerates by entropy value
- Yield slowly decays if not maintained
- Deployed agents generate passive income

## Project Structure

```
backend/
├── data/
│   ├── districts.js      # 15 district configurations
│   ├── quizzes.js        # Quiz questions for all districts
│   └── gameState.js      # In-memory state management
├── middleware/
│   └── auth.js           # Agent authentication
├── routes/
│   ├── agent.js          # Agent registration and management
│   ├── district.js       # District and server data
│   ├── game.js           # Core gameplay operations
│   ├── quiz.js           # Quiz system
│   └── mesh.js           # Token economy
├── server.js             # Main Express application
├── package.json          # Dependencies and scripts
└── README.md             # This file
```

## Security Features
- Helmet.js for HTTP security headers
- CORS enabled for all origins (development mode)
- Rate limiting: 100 requests per 15 minutes per IP
- Request logging for monitoring
- Graceful shutdown handling

## Example Usage

### 1. Register an Agent
```bash
curl -X POST http://localhost:3001/api/agent/register \
  -H "Content-Type: application/json" \
  -d '{"name": "CyberNinja"}'
```

### 2. Get Districts
```bash
curl http://localhost:3001/api/district
```

### 3. Probe a Server
```bash
curl -X POST http://localhost:3001/api/game/probe \
  -H "Content-Type: application/json" \
  -d '{
    "agent_id": "your-agent-id",
    "server_id": "gc-srv-1",
    "district_slug": "gitclave"
  }'
```

### 4. Answer Quiz Question
```bash
curl -X POST http://localhost:3001/api/quiz/gitclave/answer \
  -H "Content-Type: application/json" \
  -d '{
    "agent_id": "your-agent-id",
    "question_id": "g1",
    "answer": 1
  }'
```

### 5. Check Balance
```bash
curl http://localhost:3001/api/mesh/balance/your-agent-id
```

## Development Notes

- All state is stored in-memory (resets on server restart)
- For production, implement persistent storage (database)
- Add authentication middleware for protected routes
- Consider WebSocket for real-time updates
- Implement transaction logging for audit trail

## License
MIT

---

**VIBE://RUN** - Learn coding through hacking The Mesh
