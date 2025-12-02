export default {
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
    coverageDirectory: 'coverage',
    collectCoverageFrom: [
        'src/**/*.ts',
        '!src/**/*.spec.ts',
        '!src/test-setup.ts',
        '!src/public-api.ts',
    ],
    moduleNameMapper: {
        '^@angular/core$': '<rootDir>/node_modules/@angular/core/fesm2022/core.mjs',
        '^@angular/core/testing$': '<rootDir>/node_modules/@angular/core/fesm2022/testing.mjs',
        '^@angular/common$': '<rootDir>/node_modules/@angular/common/fesm2022/common.mjs',
        '^@angular/platform-browser$': '<rootDir>/node_modules/@angular/platform-browser/fesm2022/platform-browser.mjs',
        '^@angular/platform-browser-dynamic$': '<rootDir>/node_modules/@angular/platform-browser-dynamic/fesm2022/platform-browser-dynamic.mjs',
    },
    transform: {
        '^.+\\.(ts|js|html)$': [
            'jest-preset-angular',
            {
                tsconfig: '<rootDir>/tsconfig.spec.json',
                stringifyContentPathRegex: '\\.(html|svg)$',
            },
        ],
    },
    transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
};
