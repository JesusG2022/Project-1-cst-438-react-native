import React from 'react';
import { View, Text, StyleSheet } from 'react-native'; // Import necessary components from React Native
import Navbar from '../components/Navbar'; // Import the Navbar component for navigation links
import Title from '../components/Title'; // Import the Title component for the page title

// Page2 component: Represents the second page of the app
const Page2 = () => {
  return (
    <View style={styles.container}>
      {/* Display the title of the app */}
      <Title />
      {/* Display the navigation bar */}
      <Navbar />
      {/* Display the page title */}
      <Text style={styles.pageTitle}>Page 2</Text>
    </View>
  );
};

// Styles for the Page2 component
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
    textAlign: 'center', // Center-align the page title
  },
});

export default Page2; // Export the Page2 component as default