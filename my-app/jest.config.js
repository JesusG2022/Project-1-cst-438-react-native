/** @type {import('jest').Config} */
let refsTarget;
let webTarget;

try {
  refsTarget = require.resolve('expo-modules-core/build/Refs');
} catch {
  refsTarget = '<rootDir>/test-shims/expo-refs.js';
}

try {
  webTarget = require.resolve('expo-modules-core/build/web/index.web');
} catch {
  try {
    webTarget = require.resolve('expo-modules-core/build/web/index');
  } catch {
    webTarget = '<rootDir>/test-shims/expo-web-index.js';
  }
}

module.exports = {
  preset: 'jest-expo',
  testPathIgnorePatterns: ['/node_modules/', '/android/', '/ios/'],
  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect',
    '<rootDir>/jest.setup.ts',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|@react-native-async-storage|expo(?:-.*)?|@expo|expo-modules-core)/)',
  ],
  moduleNameMapper: {
    '^expo-modules-core/src/Refs$': refsTarget,
    '^expo-modules-core/src/web/index\\.web$': webTarget,
    '^@react-native-async-storage/async-storage$': '<rootDir>/test-shims/async-storage.js',
  },
};
