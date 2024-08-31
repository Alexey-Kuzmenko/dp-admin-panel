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
        '^.+\\.tsx?$': [
            'ts-jest',
            {
                diagnostics: {
                    ignoreCodes: [1343],
                },
                astTransformers: {
                    before: [
                        {
                            path: 'node_modules/ts-jest-mock-import-meta',
                            options: {
                                metaObjectReplacement: {
                                    env: {
                                        /* 
                                            ! Copy values from the .env file here
                                            Add secrets like this: VITE_VAR_NAME: 'varValue'
                                            */
                                        VITE_SWAGGER_DOCS: 'https://api.ok-dev.pp.ua/docs'
                                    }
                                }
                            }
                        }
                    ]
                }
            }
        ],
    },
    moduleNameMapper: {
        '^.+\\.svg$': 'jest-transformer-svg',
        '^.+\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
    setupFilesAfterEnv: ['../jest-setup/setupTests.ts'],
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