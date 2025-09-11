import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native'; // Import necessary components from React Native
import { useNavigation } from '@react-navigation/native'; // Import navigation hook for screen navigation
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'; // Import type for navigation props

import { addUser } from '../database/database'; // Import the addUser function to add users to the database

// Define the parameter list for the stack navigator
type RootStackParamList = {
  Start: undefined; // No parameters for the Start screen
  SignIn: undefined; // No parameters for the SignIn screen
  // Add other screens here if needed
};

// SignUp component: Allows users to create an account
const SignUp = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>(); // Hook to access navigation object

  // State variables to store user input
  const [username, setUsername] = useState(''); // State for username
  const [password, setPassword] = useState(''); // State for password
  const [email, setEmail] = useState(''); // State for email
  const [bio, setBio] = useState(''); // State for bio

  // Handler for the Sign Up button
  const handleSignUp = async () => {
    try {
      // Add user to the database
      await addUser(username, password, email, bio);
      console.log('User added successfully:', { username, password, email, bio }); // Log success message
      navigation.navigate('Start'); // Navigate back to the Start screen
    } catch (error) {
      console.error('Error during sign-up:', error); // Log any errors during sign-up
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none" // Disable auto-capitalization
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry // Hide password input
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address" // Use email keyboard layout
        />
        <TextInput
          style={[styles.input, styles.bioInput]} // Additional styling for bio input
          placeholder="Bio"
          value={bio}
          onChangeText={setBio}
          multiline // Allow multiple lines for bio
        />
        <Button title="Sign Up" onPress={handleSignUp} />
        <View style={{ height: 20 }} /> 
        <Button title="Back" onPress={() => navigation.navigate('Start')} />
        <View style={{ height: 20 }} /> 
      </View>
    </View>
  );
};

// Styles for the SignUp component
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
  bioInput: {
    height: 80, // Increase height for the bio input
    textAlignVertical: 'top', // Align text to the top of the input field
  },
});

export default SignUp; // Export the SignUp component as default