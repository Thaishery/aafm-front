module.exports = {
  // preset: "jest",
  // testEnvironment: "node",
  // roots: ["../src/tests/"],
  // transform: {
  //   "^.+\\.tsx?$": "jest"
  // },
  collectCoverage: true,
  collectCoverageFrom: ["../src/"],
  moduleFileExtensions: ["ts", "js", "json"],
  coverageDirectory: "../coverage"
};