import type { Config } from 'jest';

const config: Config = {
    rootDir: 'src',
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    collectCoverage: true,
    collectCoverageFrom: [
        'src/**/*.{ts,tsx}',
        '!src/**/*.d.ts',
        '!**/vendor/**'
    ],
    coverageDirectory: 'coverage',
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },
    moduleNameMapper: {
        '^.+\\.svg$': 'jest-transformer-svg',
        '^.+\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
    setupFilesAfterEnv: ['../jest-config/setupTests.ts'],
    moduleFileExtensions: [
        'tsx',
        'ts',
        'js',
        'json',
        'jsx',
        'node',
    ],
    modulePaths: ['<rootDir>/src']
};

export default config;