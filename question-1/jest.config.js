module.exports = {   // Use ts-jest to handle TypeScript files
  testEnvironment: 'node',          // Set the test environment to Node.js
  moduleFileExtensions: ['ts', 'js'], // Recognize .ts and .js files
  verbose: true,                    // Display individual test results with the test suite hierarchy
  collectCoverage: true,            // Collect test coverage information
  coverageDirectory: 'coverage',    // Output coverage reports to this directory
  coveragePathIgnorePatterns: [     // Ignore these paths when collecting coverage
    '/node_modules/',
    '/dist/',
  ],
  moduleNameMapper: {               // Map module paths for easier imports
    '^@services/(.*)$': '<rootDir>/helpers/$1',
  },
}