const districts = [
  {
    id: 1,
    slug: "gitclave",
    name: "GITCLAVE",
    baron: "VersionLord",
    module_theme: "Git & Version Control",
    unlocked: true,
    required_level: 5,
    servers: [
      { id: "gc-srv-1", name: "Origin-Prime", security: 80, yield_rate: 15, entropy: 2, max_yield: 100 },
      { id: "gc-srv-2", name: "Branch-Nexus", security: 70, yield_rate: 20, entropy: 3, max_yield: 150 },
      { id: "gc-srv-3", name: "Commit-Vault", security: 90, yield_rate: 25, entropy: 4, max_yield: 200 }
    ]
  },
  {
    id: 2,
    slug: "vaultex",
    name: "VAULTEX",
    baron: "SecretKeeper",
    module_theme: "Environment Variables & Secrets",
    unlocked: false,
    required_level: 10,
    servers: [
      { id: "vx-srv-1", name: "Env-Chamber", security: 85, yield_rate: 30, entropy: 3, max_yield: 250 },
      { id: "vx-srv-2", name: "KeyForge", security: 75, yield_rate: 35, entropy: 4, max_yield: 300 },
      { id: "vx-srv-3", name: "Cipher-Core", security: 95, yield_rate: 40, entropy: 5, max_yield: 350 }
    ]
  },
  {
    id: 3,
    slug: "datacore",
    name: "DATACORE",
    baron: "QueryMaster",
    module_theme: "SQL & Databases",
    unlocked: false,
    required_level: 15,
    servers: [
      { id: "dc-srv-1", name: "Table-Matrix", security: 88, yield_rate: 45, entropy: 4, max_yield: 400 },
      { id: "dc-srv-2", name: "Index-Spire", security: 78, yield_rate: 50, entropy: 5, max_yield: 450 },
      { id: "dc-srv-3", name: "Query-Engine", security: 92, yield_rate: 55, entropy: 6, max_yield: 500 }
    ]
  },
  {
    id: 4,
    slug: "apihex",
    name: "APIHEX",
    baron: "EndpointKing",
    module_theme: "APIs & HTTP",
    unlocked: false,
    required_level: 20,
    servers: [
      { id: "ah-srv-1", name: "REST-Gateway", security: 82, yield_rate: 60, entropy: 5, max_yield: 550 },
      { id: "ah-srv-2", name: "JSON-Hub", security: 86, yield_rate: 65, entropy: 6, max_yield: 600 },
      { id: "ah-srv-3", name: "GraphQL-Node", security: 94, yield_rate: 70, entropy: 7, max_yield: 650 }
    ]
  },
  {
    id: 5,
    slug: "authwall",
    name: "AUTHWALL",
    baron: "TokenGuardian",
    module_theme: "Authentication & JWTs",
    unlocked: false,
    required_level: 25,
    servers: [
      { id: "aw-srv-1", name: "JWT-Forge", security: 90, yield_rate: 75, entropy: 6, max_yield: 700 },
      { id: "aw-srv-2", name: "Session-Keep", security: 84, yield_rate: 80, entropy: 7, max_yield: 750 },
      { id: "aw-srv-3", name: "OAuth-Citadel", security: 96, yield_rate: 85, entropy: 8, max_yield: 800 }
    ]
  },
  {
    id: 6,
    slug: "deploydock",
    name: "DEPLOYDOCK",
    baron: "CloudCaptain",
    module_theme: "Deployment & DevOps",
    unlocked: false,
    required_level: 30,
    servers: [
      { id: "dd-srv-1", name: "Pipeline-Station", security: 87, yield_rate: 90, entropy: 7, max_yield: 850 },
      { id: "dd-srv-2", name: "Docker-Bay", security: 91, yield_rate: 95, entropy: 8, max_yield: 900 },
      { id: "dd-srv-3", name: "Cloud-Terminus", security: 98, yield_rate: 100, entropy: 9, max_yield: 950 }
    ]
  },
  {
    id: 7,
    slug: "npmfield",
    name: "NPMFIELD",
    baron: "PackageLord",
    module_theme: "NPM & Package Management",
    unlocked: false,
    required_level: 35,
    servers: [
      { id: "nf-srv-1", name: "Registry-Core", security: 89, yield_rate: 105, entropy: 8, max_yield: 1000 },
      { id: "nf-srv-2", name: "Dependency-Web", security: 83, yield_rate: 110, entropy: 9, max_yield: 1050 },
      { id: "nf-srv-3", name: "Version-Maze", security: 97, yield_rate: 115, entropy: 10, max_yield: 1100 }
    ]
  },
  {
    id: 8,
    slug: "splitzone",
    name: "SPLITZONE",
    baron: "ArchitectPrime",
    module_theme: "Frontend/Backend Separation",
    unlocked: false,
    required_level: 40,
    servers: [
      { id: "sz-srv-1", name: "Client-Plane", security: 85, yield_rate: 120, entropy: 9, max_yield: 1150 },
      { id: "sz-srv-2", name: "Server-Realm", security: 93, yield_rate: 125, entropy: 10, max_yield: 1200 },
      { id: "sz-srv-3", name: "Bridge-Interface", security: 99, yield_rate: 130, entropy: 11, max_yield: 1250 }
    ]
  },
  {
    id: 9,
    slug: "staterift",
    name: "STATERIFT",
    baron: "FluxMaster",
    module_theme: "State Management",
    unlocked: false,
    required_level: 45,
    servers: [
      { id: "sr-srv-1", name: "Redux-Fortress", security: 91, yield_rate: 135, entropy: 10, max_yield: 1300 },
      { id: "sr-srv-2", name: "Context-Labyrinth", security: 87, yield_rate: 140, entropy: 11, max_yield: 1350 },
      { id: "sr-srv-3", name: "Store-Pinnacle", security: 95, yield_rate: 145, entropy: 12, max_yield: 1400 }
    ]
  },
  {
    id: 10,
    slug: "errorgrave",
    name: "ERRORGRAVE",
    baron: "ExceptionHandler",
    module_theme: "Error Handling & Debugging",
    unlocked: false,
    required_level: 50,
    servers: [
      { id: "eg-srv-1", name: "Catch-Block", security: 92, yield_rate: 150, entropy: 11, max_yield: 1450 },
      { id: "eg-srv-2", name: "Stack-Trace", security: 88, yield_rate: 155, entropy: 12, max_yield: 1500 },
      { id: "eg-srv-3", name: "Debug-Abyss", security: 98, yield_rate: 160, entropy: 13, max_yield: 1550 }
    ]
  },
  {
    id: 11,
    slug: "cachepeak",
    name: "CACHEPEAK",
    baron: "MemoryWarden",
    module_theme: "Caching & Performance",
    unlocked: false,
    required_level: 55,
    servers: [
      { id: "cp-srv-1", name: "Redis-Summit", security: 90, yield_rate: 165, entropy: 12, max_yield: 1600 },
      { id: "cp-srv-2", name: "Memory-Cache", security: 94, yield_rate: 170, entropy: 13, max_yield: 1650 },
      { id: "cp-srv-3", name: "CDN-Apex", security: 99, yield_rate: 175, entropy: 14, max_yield: 1700 }
    ]
  },
  {
    id: 12,
    slug: "ratelimb",
    name: "RATELIMB",
    baron: "ThrottleKing",
    module_theme: "Rate Limiting & Throttling",
    unlocked: false,
    required_level: 60,
    servers: [
      { id: "rl-srv-1", name: "Limiter-Gate", security: 93, yield_rate: 180, entropy: 13, max_yield: 1750 },
      { id: "rl-srv-2", name: "Throttle-Wall", security: 89, yield_rate: 185, entropy: 14, max_yield: 1800 },
      { id: "rl-srv-3", name: "Quota-Tower", security: 97, yield_rate: 190, entropy: 15, max_yield: 1850 }
    ]
  },
  {
    id: 13,
    slug: "flagfield",
    name: "FLAGFIELD",
    baron: "FeatureToggler",
    module_theme: "Feature Flags & A/B Testing",
    unlocked: false,
    required_level: 65,
    servers: [
      { id: "ff-srv-1", name: "Toggle-Grid", security: 91, yield_rate: 195, entropy: 14, max_yield: 1900 },
      { id: "ff-srv-2", name: "Experiment-Lab", security: 95, yield_rate: 200, entropy: 15, max_yield: 1950 },
      { id: "ff-srv-3", name: "Rollout-Control", security: 99, yield_rate: 205, entropy: 16, max_yield: 2000 }
    ]
  },
  {
    id: 14,
    slug: "observatrix",
    name: "OBSERVATRIX",
    baron: "LogMaster",
    module_theme: "Logging & Observability",
    unlocked: false,
    required_level: 70,
    servers: [
      { id: "ob-srv-1", name: "Log-Stream", security: 94, yield_rate: 210, entropy: 15, max_yield: 2050 },
      { id: "ob-srv-2", name: "Metric-Collector", security: 90, yield_rate: 215, entropy: 16, max_yield: 2100 },
      { id: "ob-srv-3", name: "Trace-Analyzer", security: 98, yield_rate: 220, entropy: 17, max_yield: 2150 }
    ]
  },
  {
    id: 15,
    slug: "indexvault",
    name: "INDEXVAULT",
    baron: "PerformanceOracle",
    module_theme: "Database Indexing & Optimization",
    unlocked: false,
    required_level: 75,
    servers: [
      { id: "iv-srv-1", name: "B-Tree-Sanctuary", security: 96, yield_rate: 225, entropy: 16, max_yield: 2200 },
      { id: "iv-srv-2", name: "Index-Optimizer", security: 92, yield_rate: 230, entropy: 17, max_yield: 2250 },
      { id: "iv-srv-3", name: "Query-Accelerator", security: 100, yield_rate: 250, entropy: 18, max_yield: 2500 }
    ]
  }
];

module.exports = districts;
