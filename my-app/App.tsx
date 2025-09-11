import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native'; // Provides navigation context for the app
import { createStackNavigator } from '@react-navigation/stack'; // Creates a stack-based navigation
import Start from './pages/Start'; // Start page component
import SignIn from './pages/SignIn'; // Sign-in page component
import SignUp from './pages/SignUp'; // Sign-up page component
import Home from './pages/Home'; // Home page component
import Page1 from './pages/page1'; // Page1 component
import Page2 from './pages/page2'; // Page2 component
import WordOftheDay from './pages/WordOftheDay'; // Word of the Day page component
import MyPoems from './pages/MyPoems'; // MyPoems page component
import './database/database'; // Initializes the database

import { UserProvider } from './contexts/UserContext'; // User context provider for authentication

import SearchPost from './pages/SeachPost';
import SearchResult from './pages/SeachResult';
import { StackScreenProps } from '@react-navigation/stack'; // Type for stack screen props

// Define the type for the Home screen props
type HomeProps = StackScreenProps<RootStackParamList, 'Home'>;


// Define the parameter list for the stack navigator
export type RootStackParamList = {
  Start: undefined; // No parameters for the Start screen
  SignIn: undefined; // No parameters for the SignIn screen
  SignUp: undefined; // No parameters for the SignUp screen
  Home: { userId: string }; // Home screen expects a userId parameter
  Page1: undefined; // No parameters for Page1
  Page2: { username: string }; // Username to show their posts
  WordOftheDay: undefined; // No parameters for WordOftheDay
  MyPoems: { userId: string }; // MyPoems screen expects a userId parameter
  SearchPost: undefined; // No parameters for SearchPost
  SearchResult: { query: string }; // SearchResult expects a query parameter
};

// Create the stack navigator
const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    // Wrap the entire app with UserProvider to provide authentication context
    <UserProvider>
      <NavigationContainer>
        {/* Stack Navigator to manage screen transitions */}
        <Stack.Navigator initialRouteName="Start" screenOptions={{ headerShown: false }}>
          {/* Define each screen in the stack */}
          <Stack.Screen name="Start" component={Start} />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen
            name="Home"
            component={Home}
            initialParams={{ userId: 'defaultUserId' }} // Default parameter for Home screen
          />
          <Stack.Screen name="Page1" component={Page1} />
          <Stack.Screen name="Page2" component={Page2} />
          <Stack.Screen name="WordOftheDay" component={WordOftheDay} />
          <Stack.Screen 
            name="MyPoems" 
            component={MyPoems}
            initialParams={{ userId: 'defaultUserId' }} // Default parameter for MyPoems screen
          />
        </Stack.Navigator>
        {/* Status bar for the app */}
        <StatusBar style="auto" />
      </NavigationContainer>
    </UserProvider>
  );
}

// Styles for the app container (not used in this file but can be used elsewhere)
const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
};