import React from 'react';
import { View, Button, StyleSheet } from 'react-native'; // Import necessary components from React Native
import Title from '../components/Title'; // Import the Title component for the page title
import { useNavigation } from '@react-navigation/native'; // Import navigation hook for screen navigation
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'; // Import type for navigation props

// Define the parameter list for the stack navigator
type RootStackParamList = {
  SignIn: undefined; // No parameters for the SignIn screen
  SignUp: undefined; // No parameters for the SignUp screen
};

// Start component: The initial screen of the app
const Start = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>(); // Hook to access navigation object

  // Handler for navigating to the SignIn screen
  const handleSignIn = () => {
    navigation.navigate('SignIn'); // Navigate to the SignIn screen
    console.log('Sign In button clicked'); // Log the button click
  };

  // Handler for navigating to the SignUp screen
  const handleSignUp = () => {
    navigation.navigate('SignUp'); // Navigate to the SignUp screen
    console.log('Sign Up button clicked'); // Log the button click
  };
/* Display the title of the app */
/* Button to navigate to the SignIn screen */
/* Spacer between buttons */
/* Button to navigate to the SignUp screen */
  return (
    <View style={styles.container}>
      <Title />
      <Button title="Sign In" onPress={handleSignIn} />
      <View style={{ height: 20 }} />    
      <Button title="Sign Up" onPress={handleSignUp} />
    </View>
  );
};

// Styles for the Start component
const styles = StyleSheet.create({
  container: {
    flex: 1, // Take up the full screen
    alignItems: 'center', // Center items horizontally
    justifyContent: 'center', // Center items vertically
  },
});

export default Start; // Export the Start component as default