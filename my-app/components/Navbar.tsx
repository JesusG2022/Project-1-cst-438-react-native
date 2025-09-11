import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'; // Import necessary components from React Native
import { useNavigation } from '@react-navigation/native'; // Import navigation hook for screen navigation
import { useUser } from '../contexts/UserContext'; // Import user context for authentication

// Navbar component to provide navigation links
const Navbar = () => {
  const navigation = useNavigation<any>(); // Hook to access navigation object
  const { currentUser, logout } = useUser(); // Get current user and logout function from context

  return (
    <View style={styles.navbar}>
      {/* Navigation link to the Home screen */}
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text style={styles.link}>Home</Text>
      </TouchableOpacity>

      {/* Navigation link to the Accounts (Page1) screen */}
      <TouchableOpacity onPress={() => navigation.navigate('Page1')}>
        <Text style={styles.link}>Accounts</Text>
      </TouchableOpacity>

      {/* Navigation link to Page 2 */}
      <TouchableOpacity onPress={() => navigation.navigate('Page2')}>
        <Text style={styles.link}>Page 2</Text>
      </TouchableOpacity>

      {/* Navigation link to the Word of the Day screen */}
      <TouchableOpacity onPress={() => navigation.navigate('WordOftheDay')}>
        <Text style={styles.link}>Word</Text>
      </TouchableOpacity>

      {/* Navigation link to My Posts screen */}
      {currentUser && (
        <TouchableOpacity onPress={() => navigation.navigate('MyPoems')}>
          <Text style={styles.link}>My Posts</Text>
        </TouchableOpacity>
      )}
      
      {/* Logout button */}
      {currentUser && (
        <TouchableOpacity onPress={() => {
          logout(); // Clear current user from context
          navigation.navigate('Start'); // Navigate back to start page
        }}>
          <Text style={styles.logoutLink}>Logout</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

// Styles for the Navbar component
const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row', // Arrange items in a row
    justifyContent: 'space-around', // Space items evenly
    alignItems: 'center', // Align items vertically in the center
    height: 40, // Set the height of the navbar
    backgroundColor: '#1976d2', // Set the background color
    elevation: 4, // Add shadow for Android
    padding: 10, // Add padding inside the navbar
  },
  link: {
    color: '#fff', // Set text color to white
    fontSize: 18, // Set font size
    fontWeight: 'bold', // Make text bold
    marginHorizontal: 10, // Add horizontal margin between links
  },
  logoutLink: {
    color: '#ffcdd2', // Set text color to light red for logout button
    fontSize: 18, // Set font size
    fontWeight: 'bold', // Make text bold
    marginHorizontal: 10, // Add horizontal margin between links
  },
});

export default Navbar; // Export the Navbar component as default