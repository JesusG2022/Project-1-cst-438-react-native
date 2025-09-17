// jest.setup.js
import 'react-native-gesture-handler/jestSetup';

jest.mock('react-native', () => ({
  StyleSheet: {
    create: styles => styles,
  },
}));

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

jest.mock('expo-sqlite', () => ({
  openDatabaseSync: () => ({
    execAsync: jest.fn().mockResolvedValue([]),
    runAsync: jest.fn().mockResolvedValue({ lastInsertRowId: 1, changes: 1 }),
    getAllAsync: jest.fn().mockResolvedValue([{ UserId: 1 }]),
    transaction: jest.fn(),
  }),
}));