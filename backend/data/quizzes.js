const quizzes = {
  gitclave: [
    {
      id: "g1",
      question: "What does 'git init' do?",
      type: "multiple_choice",
      options: [
        "Installs Git",
        "Creates a new Git repository in current directory",
        "Clones a remote repo",
        "Deletes current repository"
      ],
      answer: 1,
      mesh_reward: 50
    },
    {
      id: "g2",
      question: "Which command stages ALL changed files for a commit?",
      type: "multiple_choice",
      options: [
        "git commit -a",
        "git push --all",
        "git add .",
        "git stage --all"
      ],
      answer: 2,
      mesh_reward: 50
    },
    {
      id: "g3",
      question: "What is a .gitignore file for?",
      type: "multiple_choice",
      options: [
        "List contributors",
        "Specify files Git should NOT track",
        "Configure Git user settings",
        "Store commit messages"
      ],
      answer: 1,
      mesh_reward: 50
    },
    {
      id: "g4",
      question: "A Git commit is a snapshot of your project at a specific point in time.",
      type: "true_false",
      answer: true,
      mesh_reward: 25
    },
    {
      id: "g5",
      question: "You must be connected to the internet to make a Git commit.",
      type: "true_false",
      answer: false,
      mesh_reward: 25
    },
    {
      id: "g6",
      question: "Branching in Git creates a completely separate copy of the entire repository.",
      type: "true_false",
      answer: false,
      mesh_reward: 25
    },
    {
      id: "g7",
      question: "What is the difference between 'git pull' and 'git fetch'?",
      type: "open_ended",
      keywords: ["fetch downloads", "pull merges", "remote", "local"],
      mesh_reward: 100
    }
  ],
  
  vaultex: [
    {
      id: "v1",
      question: "Where should you store sensitive API keys?",
      type: "multiple_choice",
      options: [
        "Directly in source code",
        "In a .env file listed in .gitignore",
        "In README.md",
        "In package.json"
      ],
      answer: 1,
      mesh_reward: 50
    },
    {
      id: "v2",
      question: "What happens if you commit an API key to a public GitHub repo?",
      type: "multiple_choice",
      options: [
        "Nothing, GitHub encrypts it",
        "Key is compromised, rotate immediately",
        "Git auto-removes it",
        "Only collaborators see it"
      ],
      answer: 1,
      mesh_reward: 50
    },
    {
      id: "v3",
      question: "How do you access an env var called DB_URL in Node.js?",
      type: "multiple_choice",
      options: [
        "env.DB_URL",
        "process.env.DB_URL",
        "global.DB_URL",
        "config.get('DB_URL')"
      ],
      answer: 1,
      mesh_reward: 50
    },
    {
      id: "v4",
      question: "It is safe to push .env files to GitHub if the repository is private.",
      type: "true_false",
      answer: false,
      mesh_reward: 25
    },
    {
      id: "v5",
      question: "Different deployment environments often use different environment variable values.",
      type: "true_false",
      answer: true,
      mesh_reward: 25
    }
  ],
  
  datacore: [
    {
      id: "d1",
      question: "What does SQL stand for?",
      type: "multiple_choice",
      options: [
        "Structured Query Language",
        "Simple Question Language",
        "Server Query Logic",
        "System Quality Language"
      ],
      answer: 0,
      mesh_reward: 50
    },
    {
      id: "d2",
      question: "Which SQL command retrieves data from a database?",
      type: "multiple_choice",
      options: [
        "GET",
        "RETRIEVE",
        "SELECT",
        "FETCH"
      ],
      answer: 2,
      mesh_reward: 50
    },
    {
      id: "d3",
      question: "What is a PRIMARY KEY in a database table?",
      type: "multiple_choice",
      options: [
        "The first column in a table",
        "A unique identifier for each row",
        "The password to access the database",
        "The most important data column"
      ],
      answer: 1,
      mesh_reward: 50
    },
    {
      id: "d4",
      question: "SQL databases are schema-less and don't require predefined table structures.",
      type: "true_false",
      answer: false,
      mesh_reward: 25
    },
    {
      id: "d5",
      question: "A JOIN operation combines rows from two or more tables based on a related column.",
      type: "true_false",
      answer: true,
      mesh_reward: 25
    },
    {
      id: "d6",
      question: "Explain the difference between INNER JOIN and LEFT JOIN.",
      type: "open_ended",
      keywords: ["inner", "matching", "left", "all rows", "null"],
      mesh_reward: 100
    }
  ],
  
  apihex: [
    {
      id: "a1",
      question: "What does REST stand for?",
      type: "multiple_choice",
      options: [
        "Remote Execution Server Technology",
        "Representational State Transfer",
        "Rapid Execution Service Transfer",
        "Real-time Exchange System Technology"
      ],
      answer: 1,
      mesh_reward: 50
    },
    {
      id: "a2",
      question: "Which HTTP method is used to retrieve data from an API?",
      type: "multiple_choice",
      options: [
        "POST",
        "PUT",
        "GET",
        "DELETE"
      ],
      answer: 2,
      mesh_reward: 50
    },
    {
      id: "a3",
      question: "What HTTP status code indicates a successful request?",
      type: "multiple_choice",
      options: [
        "404",
        "500",
        "200",
        "301"
      ],
      answer: 2,
      mesh_reward: 50
    },
    {
      id: "a4",
      question: "APIs can only return data in JSON format.",
      type: "true_false",
      answer: false,
      mesh_reward: 25
    },
    {
      id: "a5",
      question: "A POST request is typically used to create new resources on a server.",
      type: "true_false",
      answer: true,
      mesh_reward: 25
    },
    {
      id: "a6",
      question: "What is the purpose of API authentication?",
      type: "open_ended",
      keywords: ["verify", "identity", "access", "authorized", "security"],
      mesh_reward: 100
    }
  ],
  
  authwall: [
    {
      id: "au1",
      question: "What does JWT stand for?",
      type: "multiple_choice",
      options: [
        "JavaScript Web Token",
        "JSON Web Token",
        "Just Working Token",
        "Java Web Technology"
      ],
      answer: 1,
      mesh_reward: 50
    },
    {
      id: "au2",
      question: "Which part of a JWT contains the actual claims/data?",
      type: "multiple_choice",
      options: [
        "Header",
        "Payload",
        "Signature",
        "Timestamp"
      ],
      answer: 1,
      mesh_reward: 50
    },
    {
      id: "au3",
      question: "What is hashing used for in password storage?",
      type: "multiple_choice",
      options: [
        "To compress passwords",
        "To encrypt passwords reversibly",
        "To create one-way encrypted representations",
        "To store passwords in plain text"
      ],
      answer: 2,
      mesh_reward: 50
    },
    {
      id: "au4",
      question: "JWTs should be stored in localStorage for maximum security.",
      type: "true_false",
      answer: false,
      mesh_reward: 25
    },
    {
      id: "au5",
      question: "Password hashing is irreversible - you cannot decrypt a hashed password.",
      type: "true_false",
      answer: true,
      mesh_reward: 25
    },
    {
      id: "au6",
      question: "Explain the difference between authentication and authorization.",
      type: "open_ended",
      keywords: ["authentication", "identity", "authorization", "permissions", "verify", "access"],
      mesh_reward: 100
    }
  ],
  
  deploydock: [
    {
      id: "dd1",
      question: "What is CI/CD?",
      type: "multiple_choice",
      options: [
        "Code Integration/Code Deployment",
        "Continuous Integration/Continuous Deployment",
        "Computer Interface/Computer Design",
        "Central Integration/Central Distribution"
      ],
      answer: 1,
      mesh_reward: 50
    },
    {
      id: "dd2",
      question: "What is Docker primarily used for?",
      type: "multiple_choice",
      options: [
        "Database management",
        "Application containerization",
        "Code version control",
        "API testing"
      ],
      answer: 1,
      mesh_reward: 50
    },
    {
      id: "dd3",
      question: "Which environment should code be tested in before production?",
      type: "multiple_choice",
      options: [
        "Only local development",
        "Staging/pre-production",
        "Directly in production",
        "Never needs testing"
      ],
      answer: 1,
      mesh_reward: 50
    },
    {
      id: "dd4",
      question: "You should always test deployments directly in production to save time.",
      type: "true_false",
      answer: false,
      mesh_reward: 25
    },
    {
      id: "dd5",
      question: "Environment variables should be different between development and production.",
      type: "true_false",
      answer: true,
      mesh_reward: 25
    }
  ],
  
  npmfield: [
    {
      id: "n1",
      question: "What command installs all dependencies listed in package.json?",
      type: "multiple_choice",
      options: [
        "npm start",
        "npm install",
        "npm run",
        "npm init"
      ],
      answer: 1,
      mesh_reward: 50
    },
    {
      id: "n2",
      question: "What is the purpose of package-lock.json?",
      type: "multiple_choice",
      options: [
        "To lock the package from being used",
        "To ensure consistent dependency versions across installs",
        "To password-protect packages",
        "To list all available npm packages"
      ],
      answer: 1,
      mesh_reward: 50
    },
    {
      id: "n3",
      question: "What does 'npm init' do?",
      type: "multiple_choice",
      options: [
        "Installs npm",
        "Creates a new package.json file",
        "Updates all packages",
        "Deletes node_modules"
      ],
      answer: 1,
      mesh_reward: 50
    },
    {
      id: "n4",
      question: "The node_modules folder should be committed to Git.",
      type: "true_false",
      answer: false,
      mesh_reward: 25
    },
    {
      id: "n5",
      question: "devDependencies are packages only needed during development, not in production.",
      type: "true_false",
      answer: true,
      mesh_reward: 25
    }
  ],
  
  splitzone: [
    {
      id: "sz1",
      question: "What is the main purpose of separating frontend and backend?",
      type: "multiple_choice",
      options: [
        "To make code more complex",
        "To enable independent scaling and development",
        "To slow down development",
        "To use more servers"
      ],
      answer: 1,
      mesh_reward: 50
    },
    {
      id: "sz2",
      question: "Which layer handles the user interface?",
      type: "multiple_choice",
      options: [
        "Backend",
        "Database",
        "Frontend",
        "API"
      ],
      answer: 2,
      mesh_reward: 50
    },
    {
      id: "sz3",
      question: "Where should business logic typically reside?",
      type: "multiple_choice",
      options: [
        "Only in the frontend",
        "In the backend/API layer",
        "In the CSS files",
        "In environment variables"
      ],
      answer: 1,
      mesh_reward: 50
    },
    {
      id: "sz4",
      question: "Frontend and backend should always be deployed on the same server.",
      type: "true_false",
      answer: false,
      mesh_reward: 25
    },
    {
      id: "sz5",
      question: "CORS (Cross-Origin Resource Sharing) is often needed when frontend and backend are on different domains.",
      type: "true_false",
      answer: true,
      mesh_reward: 25
    }
  ],
  
  staterift: [
    {
      id: "sr1",
      question: "What is application state?",
      type: "multiple_choice",
      options: [
        "The location of the server",
        "Data that changes over time in an application",
        "The version of the app",
        "The programming language used"
      ],
      answer: 1,
      mesh_reward: 50
    },
    {
      id: "sr2",
      question: "What is Redux primarily used for?",
      type: "multiple_choice",
      options: [
        "Database management",
        "State management in JavaScript apps",
        "Server deployment",
        "API routing"
      ],
      answer: 1,
      mesh_reward: 50
    },
    {
      id: "sr3",
      question: "What is a common problem that state management libraries solve?",
      type: "multiple_choice",
      options: [
        "Slow internet connection",
        "Prop drilling and shared state across components",
        "Server crashes",
        "CSS styling issues"
      ],
      answer: 1,
      mesh_reward: 50
    },
    {
      id: "sr4",
      question: "Global state should be used for every piece of data in an application.",
      type: "true_false",
      answer: false,
      mesh_reward: 25
    },
    {
      id: "sr5",
      question: "State management becomes more important as applications grow in complexity.",
      type: "true_false",
      answer: true,
      mesh_reward: 25
    }
  ],
  
  errorgrave: [
    {
      id: "e1",
      question: "What is the purpose of a try-catch block?",
      type: "multiple_choice",
      options: [
        "To make code run faster",
        "To handle errors gracefully without crashing",
        "To test code functionality",
        "To deploy applications"
      ],
      answer: 1,
      mesh_reward: 50
    },
    {
      id: "e2",
      question: "What information does a stack trace provide?",
      type: "multiple_choice",
      options: [
        "The amount of memory used",
        "The sequence of function calls leading to an error",
        "The server's IP address",
        "The user's location"
      ],
      answer: 1,
      mesh_reward: 50
    },
    {
      id: "e3",
      question: "What is the difference between development and production error handling?",
      type: "multiple_choice",
      options: [
        "No difference",
        "Production should hide sensitive error details from users",
        "Development should hide all errors",
        "Production should show more details"
      ],
      answer: 1,
      mesh_reward: 50
    },
    {
      id: "e4",
      question: "It's acceptable to use empty catch blocks that ignore errors.",
      type: "true_false",
      answer: false,
      mesh_reward: 25
    },
    {
      id: "e5",
      question: "Logging errors helps in debugging and monitoring application health.",
      type: "true_false",
      answer: true,
      mesh_reward: 25
    },
    {
      id: "e6",
      question: "Why should you avoid showing detailed error messages to end users in production?",
      type: "open_ended",
      keywords: ["security", "sensitive", "information", "exposure", "attackers"],
      mesh_reward: 100
    }
  ],
  
  cachepeak: [
    {
      id: "c1",
      question: "What is caching?",
      type: "multiple_choice",
      options: [
        "Deleting old data",
        "Storing frequently accessed data for faster retrieval",
        "Compressing files",
        "Backing up databases"
      ],
      answer: 1,
      mesh_reward: 50
    },
    {
      id: "c2",
      question: "Which is a popular in-memory caching solution?",
      type: "multiple_choice",
      options: [
        "MySQL",
        "Redis",
        "Express",
        "React"
      ],
      answer: 1,
      mesh_reward: 50
    },
    {
      id: "c3",
      question: "What is cache invalidation?",
      type: "multiple_choice",
      options: [
        "Deleting the cache folder",
        "Removing or updating stale cached data",
        "Encrypting cached data",
        "Compressing cached data"
      ],
      answer: 1,
      mesh_reward: 50
    },
    {
      id: "c4",
      question: "Cached data should never expire and should be stored forever.",
      type: "true_false",
      answer: false,
      mesh_reward: 25
    },
    {
      id: "c5",
      question: "Caching can significantly improve application performance and reduce database load.",
      type: "true_false",
      answer: true,
      mesh_reward: 25
    }
  ],
  
  ratelimb: [
    {
      id: "r1",
      question: "What is rate limiting?",
      type: "multiple_choice",
      options: [
        "Slowing down internet speed",
        "Restricting the number of requests a client can make in a time period",
        "Limiting file sizes",
        "Reducing server capacity"
      ],
      answer: 1,
      mesh_reward: 50
    },
    {
      id: "r2",
      question: "Why is rate limiting important for APIs?",
      type: "multiple_choice",
      options: [
        "To make APIs slower",
        "To prevent abuse and ensure fair resource usage",
        "To increase server costs",
        "To block all users"
      ],
      answer: 1,
      mesh_reward: 50
    },
    {
      id: "r3",
      question: "What HTTP status code typically indicates rate limit exceeded?",
      type: "multiple_choice",
      options: [
        "200",
        "404",
        "429",
        "500"
      ],
      answer: 2,
      mesh_reward: 50
    },
    {
      id: "r4",
      question: "Rate limiting only protects against malicious attacks, not legitimate heavy usage.",
      type: "true_false",
      answer: false,
      mesh_reward: 25
    },
    {
      id: "r5",
      question: "Rate limits can be set per IP address, per user, or per API key.",
      type: "true_false",
      answer: true,
      mesh_reward: 25
    }
  ],
  
  flagfield: [
    {
      id: "f1",
      question: "What is a feature flag?",
      type: "multiple_choice",
      options: [
        "A country's flag icon",
        "A toggle that enables/disables features without code changes",
        "A security feature",
        "A type of database"
      ],
      answer: 1,
      mesh_reward: 50
    },
    {
      id: "f2",
      question: "What is A/B testing?",
      type: "multiple_choice",
      options: [
        "Testing two different API endpoints",
        "Comparing two versions of a feature with different user groups",
        "Testing alphabetically",
        "A type of security audit"
      ],
      answer: 1,
      mesh_reward: 50
    },
    {
      id: "f3",
      question: "What is a benefit of feature flags?",
      type: "multiple_choice",
      options: [
        "Faster code execution",
        "Ability to deploy code but control feature rollout independently",
        "Reduced server costs",
        "Automatic bug fixes"
      ],
      answer: 1,
      mesh_reward: 50
    },
    {
      id: "f4",
      question: "Feature flags allow you to roll back features instantly without redeploying code.",
      type: "true_false",
      answer: true,
      mesh_reward: 25
    },
    {
      id: "f5",
      question: "A/B testing helps make data-driven decisions about features.",
      type: "true_false",
      answer: true,
      mesh_reward: 25
    }
  ],
  
  observatrix: [
    {
      id: "o1",
      question: "What are the three pillars of observability?",
      type: "multiple_choice",
      options: [
        "Frontend, Backend, Database",
        "Logs, Metrics, Traces",
        "Security, Performance, Reliability",
        "HTML, CSS, JavaScript"
      ],
      answer: 1,
      mesh_reward: 50
    },
    {
      id: "o2",
      question: "What is the purpose of application logging?",
      type: "multiple_choice",
      options: [
        "To slow down applications",
        "To record events and errors for debugging and monitoring",
        "To store user passwords",
        "To compress files"
      ],
      answer: 1,
      mesh_reward: 50
    },
    {
      id: "o3",
      question: "What do metrics typically measure?",
      type: "multiple_choice",
      options: [
        "Code quality",
        "Quantitative data like response times, error rates, throughput",
        "User preferences",
        "File sizes"
      ],
      answer: 1,
      mesh_reward: 50
    },
    {
      id: "o4",
      question: "You should log sensitive information like passwords to help with debugging.",
      type: "true_false",
      answer: false,
      mesh_reward: 25
    },
    {
      id: "o5",
      question: "Distributed tracing helps track requests across multiple services in a microservices architecture.",
      type: "true_false",
      answer: true,
      mesh_reward: 25
    },
    {
      id: "o6",
      question: "Why is observability important in production systems?",
      type: "open_ended",
      keywords: ["understand", "behavior", "debug", "monitor", "issues", "performance"],
      mesh_reward: 100
    }
  ],
  
  indexvault: [
    {
      id: "i1",
      question: "What is a database index?",
      type: "multiple_choice",
      options: [
        "A list of all tables",
        "A data structure that improves query performance",
        "The first row in a table",
        "A backup of the database"
      ],
      answer: 1,
      mesh_reward: 50
    },
    {
      id: "i2",
      question: "What is a trade-off of adding indexes?",
      type: "multiple_choice",
      options: [
        "No trade-offs",
        "Slower write operations and increased storage",
        "Faster writes",
        "Less storage needed"
      ],
      answer: 1,
      mesh_reward: 50
    },
    {
      id: "i3",
      question: "When should you add an index to a column?",
      type: "multiple_choice",
      options: [
        "To every column in every table",
        "To columns frequently used in WHERE, JOIN, or ORDER BY clauses",
        "Never add indexes",
        "Only to the first column"
      ],
      answer: 1,
      mesh_reward: 50
    },
    {
      id: "i4",
      question: "Adding more indexes always improves database performance.",
      type: "true_false",
      answer: false,
      mesh_reward: 25
    },
    {
      id: "i5",
      question: "Query optimization and proper indexing can dramatically reduce response times.",
      type: "true_false",
      answer: true,
      mesh_reward: 25
    },
    {
      id: "i6",
      question: "Explain why too many indexes can hurt database performance.",
      type: "open_ended",
      keywords: ["write", "insert", "update", "overhead", "maintain", "storage"],
      mesh_reward: 100
    }
  ]
};

module.exports = quizzes;
