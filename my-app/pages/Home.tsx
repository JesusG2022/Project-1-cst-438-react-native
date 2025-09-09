// Import necessary components and modules
import Title from '../components/Title'; // Import the Title component for the page title
import Navbar from '../components/Navbar'; // Import the Navbar component for navigation links
import React from 'react';
import { View, Text, StyleSheet } from 'react-native'; // Import React Native components
import { StackScreenProps } from '@react-navigation/stack'; // Import type for stack screen props
import { RootStackParamList } from '../App'; // Import the RootStackParamList type from App.tsx

// Define the type for the Home screen props
type HomeProps = StackScreenProps<RootStackParamList, 'Home'>;

// Home component: Displays the home page of the app
const Home: React.FC<HomeProps> = ({ route }) => {
  // Extract the userId parameter from the route props
  const { userId } = route.params;

  // Log the userId to the console for debugging purposes
  console.log('User ID:', userId);

  return (
    <View style={styles.container}>
      <Title />
      <Navbar />
      <Text style={styles.pageTitle}>Home Page</Text>
      <Text style={styles.textAll}>Welcome to the home page!</Text>
    </View>
  );
};

// Styles for the Home component
const styles = StyleSheet.create({
  container: {
    flex: 1, // Take up the full screen
    alignItems: 'center', // Center items horizontally
    paddingTop: 40, // Add padding at the top
    backgroundColor: '#fff', // Set the background color to white
  },
  pageTitle: {
    fontSize: 24, // Set font size for the page title
    fontWeight: 'bold', // Make the page title bold
    marginTop: 24, // Add space above the page title
    marginBottom: 12, // Add space below the page title
    textAlign: 'center', // Center-align the page title
  },
  textAll: {
    fontSize: 16, // Set font size for the welcome message
    textAlign: 'center', // Center-align the welcome message
    color: '#333', // Set the text color
  },
});

export default Home; // Export the Home component as default