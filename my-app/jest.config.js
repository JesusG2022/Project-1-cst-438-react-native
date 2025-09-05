module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'babel-jest', // Use Babel to transform TypeScript files
  },
  transformIgnorePatterns: [
    'node_modules/(?!(expo-sqlite|expo|@expo|react-native|@react-native|@react-navigation)/)', // Allow Jest to process these modules
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
};