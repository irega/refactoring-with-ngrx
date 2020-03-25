module.exports = {
  globals: {
    'ts-jest': {
      diagnostics: false,
      tsConfig: '<rootDir>/src/tsconfig.spec.json'
    }
  },
  roots: ['<rootDir>/src'],
  testMatch: ['<rootDir>/src/**/__tests__/**/*.[jt]s?(x)', '<rootDir>/src/**/*(*.)@(spec|test).[tj]s?(x)'],
  transformIgnorePatterns: ['^.+\\.js$']
};
