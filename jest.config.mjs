// https://nextjs.org/docs/pages/building-your-application/optimizing/testing#jest-and-react-testing-library
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
/** @type {import('ts-jest').JestConfigWithTsJest} */
const config = {
  preset: 'ts-jest',
  collectCoverageFrom: ['**/*.{ts,tsx}', '!**/*.config.*'],

  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],

  testEnvironment: 'jest-environment-jsdom',
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
