export default {
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
    coverageDirectory: 'coverage',
    collectCoverageFrom: [
        'src/**/*.ts',
        '!src/**/*.spec.ts',
        '!src/test-setup.ts',
        '!src/main.ts',
        '!src/polyfills.ts',
    ],
    moduleNameMapper: {
        '@hackathon/shared': '<rootDir>/../../packages/shared/src/public-api.ts',
        '^@angular/core$': '<rootDir>/node_modules/@angular/core/fesm2022/core.mjs',
        '^@angular/core/testing$': '<rootDir>/node_modules/@angular/core/fesm2022/testing.mjs',
        '^@angular/common$': '<rootDir>/node_modules/@angular/common/fesm2022/common.mjs',
        '^@angular/platform-browser$': '<rootDir>/node_modules/@angular/platform-browser/fesm2022/platform-browser.mjs',
        '^@angular/platform-browser-dynamic$': '<rootDir>/node_modules/@angular/platform-browser-dynamic/fesm2022/platform-browser-dynamic.mjs',
        '^ionicons/components/(.*)$': '<rootDir>/node_modules/ionicons/components/$1',
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
    transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$|@ionic|@stencil|ionicons)'],
};
