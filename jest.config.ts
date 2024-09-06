import nextJest from 'next/jest';
import type { Config } from 'jest';

const createJestConfig = nextJest({ dir: './' });

const jestConfig: Config = {
  rootDir: './',
  coverageProvider: 'v8',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  // testEnvironment: 'jest-environment-jsdom',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@Src/app(.*)$': '<rootDir>/src/app/$1',
    '^@Src/pages(.*)$': '<rootDir>/src/pages/$1',
    '^@Components/(.*)$': '<rootDir>/src/components/$1',
  },
  moduleDirectories: ['node_modules', '<rootDir>/src'],
};

export default createJestConfig(jestConfig);
