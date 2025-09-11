import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'; // Import necessary components from React Native
import { useNavigation } from '@react-navigation/native'; // Import navigation hook for screen navigation
import { useUser } from '../contexts/UserContext'; // Import user context for authentication


const Navbar = () => {
  const navigation = useNavigation<any>(); // Hook to access navigation object
  const { currentUser, logout } = useUser(); // Get current user and logout function from context


  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text style={styles.link}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Page1')}>
        <Text style={styles.link}>Accounts</Text>
      </TouchableOpacity>
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

      {/* Add navigation link for SearchPost */}
      <TouchableOpacity onPress={() => navigation.navigate('SearchPost')}>
        <Text style={styles.link}>Search</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 40,
    backgroundColor: '#1976d2',
    elevation: 4,
    padding: 10,
  },
  link: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  logoutLink: {
    color: '#ffcdd2', // Set text color to light red for logout button
    fontSize: 18, // Set font size
    fontWeight: 'bold', // Make text bold
    marginHorizontal: 10, // Add horizontal margin between links
  },
});

export default Navbar;