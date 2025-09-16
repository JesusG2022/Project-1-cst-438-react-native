import '@testing-library/jest-native/extend-expect';

// // AsyncStorage mock
// jest.mock('@react-native-async-storage/async-storage', () =>
//   require('@react-native-async-storage/async-storage/jest/async-storage-mock')
// );

jest.mock(
  'react-native/Libraries/Animated/NativeAnimatedHelper',
  () => ({}),
  { virtual: true }
);

jest.mock('expo-modules-core/src/Refs', () =>
  require('expo-modules-core/build/Refs')
);

// Global fetch mock (tests will override per test)
Object.defineProperty(globalThis, 'fetch', {
    value: jest.fn(),
    writable: true,
  });
