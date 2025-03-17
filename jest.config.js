module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  moduleNameMapper: {
    "^@/components/(.*)$": "<rootDir>/components/$1",
  },
  transformIgnorePatterns: [
    // Spécifiez ici les modules node qui doivent être transformés
    // Par défaut, Jest ignore les transformations dans node_modules
    "/node_modules/(?!(lucide-react|react-markdown|other-esm-modules)/)",
  ],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};
