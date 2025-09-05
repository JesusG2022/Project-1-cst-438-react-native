import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native'; // Import necessary components from React Native
import { useNavigation } from '@react-navigation/native'; // Import navigation hook for screen navigation
import type { StackNavigationProp } from '@react-navigation/stack'; // Import type for navigation props
import * as SQLite from 'expo-sqlite'; // Import SQLite module for database operations

// Define the parameter list for the stack navigator
type RootStackParamList = {
  Home: { userId: number }; // Home screen expects a userId parameter
  Start: undefined; // No parameters for the Start screen
  SignUp: undefined; // No parameters for the SignUp screen
};

// SignIn component: Allows users to log in to their account
const SignIn = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>(); // Hook to access navigation object

  // State variables to store user input and error messages
  const [username, setUsername] = useState(''); // State for username
  const [password, setPassword] = useState(''); // State for password
  const [errorMessage, setErrorMessage] = useState(''); // State for error messages

  // Handler for the Sign In button
  const handleSignIn = async () => {
    try {
      // Open a connection to the SQLite database
      const db = await SQLite.openDatabaseAsync('databaseName');

      // Query the database to check if the username and password match
      const row = await db.getFirstAsync<{ UserId: number }>(
        `SELECT UserId FROM User13 WHERE Username = ? AND Password = ?`,
        [username, password]
      );

      if (row && row.UserId) {
        // If a matching user is found, navigate to the Home screen
        setErrorMessage(''); // Clear any error messages
        navigation.navigate('Home', { userId: row.UserId }); // Pass the userId to the Home screen
      } else {
        // If no matching user is found, display an error message
        setErrorMessage('Wrong username or password');
      }
    } catch (error) {
      // Handle any errors during the sign-in process
      console.error('Error during sign-in:', error);
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Page title */}
      <Text style={styles.title}>Sign In</Text>
      <View style={styles.inputContainer}>
        {/* Input field for username */}
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none" // Disable auto-capitalization
        />
        {/* Input field for password */}
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry // Hide password input
        />
        {/* Sign In button */}
        <Button title="Sign In" onPress={handleSignIn} />
        <View style={{ height: 20 }} /> {/* Spacer */}
        {/* Back button to navigate to the Start screen */}
        <Button title="Back" onPress={() => navigation.navigate('Start')} />
        <View style={{ height: 20 }} /> {/* Spacer */}
        {/* Display error message if any */}
        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
      </View>
    </View>
  );
};

// Styles for the SignIn component
const styles = StyleSheet.create({
  container: {
    flex: 1, // Take up the full screen
    alignItems: 'center', // Center items horizontally
    justifyContent: 'center', // Center items vertically
    padding: 16, // Add padding around the container
  },
  title: {
    fontSize: 28, // Set font size for the title
    fontWeight: 'bold', // Make the title bold
    marginBottom: 24, // Add space below the title
    textAlign: 'center', // Center-align the title
  },
  inputContainer: {
    width: '100%', // Take up the full width of the screen
    maxWidth: 300, // Set a maximum width for the input container
  },
  input: {
    height: 40, // Set the height of the input fields
    borderColor: '#1976d2', // Set the border color
    borderWidth: 1, // Set the border width
    borderRadius: 4, // Round the corners of the input fields
    marginBottom: 16, // Add space below each input field
    paddingHorizontal: 8, // Add horizontal padding inside the input fields
    backgroundColor: '#fff', // Set the background color of the input fields
  },
  errorText: {
    marginTop: 16, // Add space above the error message
    color: 'red', // Set the text color to red
    fontSize: 14, // Set font size for the error message
    textAlign: 'center', // Center-align the error message
  },
});

export default SignIn; // Export the SignIn component as default