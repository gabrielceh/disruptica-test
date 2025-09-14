const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  preset: "ts-jest",
  verbose: true,
  testMatch: ["**/src/**/*.test.ts"],
  moduleFileExtensions: ['js', 'ts', 'json'],
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
  },

  roots: ["<rootDir>/src"],
  moduleNameMapper: {
    "^@src/(.*)$": "<rootDir>/src/$1",
    "^@modules/(.*)$": "<rootDir>/src/modules/$1",
    "^@core/(.*)$": "<rootDir>/src/core/$1",
  },
};