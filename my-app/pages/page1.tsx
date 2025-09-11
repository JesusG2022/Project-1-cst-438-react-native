import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet } from 'react-native'; // Import necessary components from React Native
import Navbar from '../components/Navbar'; // Import the Navbar component for navigation links
import Title from '../components/Title'; // Import the Title component for the page title
import { useNavigation } from '@react-navigation/native'; // Import navigation hook for screen navigation
import { TouchableOpacity } from 'react-native'; // Import TouchableOpacity for clickable elements
import { NativeStackNavigationProp } from '@react-navigation/native-stack'; // Import type for navigation props
import { getAllUsers } from '../database/database';
import { RootStackParamList } from '../App'; // Import the shared type definition (replaces local type definition)

// Define the type for the Page1 screen navigation prop
type Page1ScreenProp = NativeStackNavigationProp<RootStackParamList, 'Page1'>;

// Page1 component: Displays a list of user profiles
const Page1 = () => {
  //get users from database and navigation
  const [users, setUsers] = useState<{ Username: string; Bio: string }[]>([]);
  const navigation = useNavigation<Page1ScreenProp>();

  useEffect(() => {
    const fetchUsers = async () => {
      const dbUsers = await getAllUsers();
      setUsers(dbUsers as { Username: string; Bio: string }[]);
    };
    fetchUsers();
  }, []);

  return (
    <View style={styles.container}>
      {/* Display the title of the app */}
      <Title />
      {/* Display the navigation bar */}
      <Navbar />
      {/* Display the page title */}
      <Text style={styles.pageTitle}>User Profiles</Text>
      <View style={styles.break} /> {/* Spacer */}
      <View style={styles.usersContainer}>
        {/* Render a list of user profiles */}
        {users.map((user, idx) => (
          <View key={idx} style={styles.userBox}>
            {/* Navigate to Page2 when the user name is clicked */}
            <TouchableOpacity onPress={() => navigation.navigate('Page2', { username: user.Username })}>
              <Text style={[styles.name, { textDecorationLine: 'underline' }]}>{user.Username}</Text>
            </TouchableOpacity>
            {/* Display the user's bio */}
            <Text style={styles.bio}>{user.Bio}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

// Styles for the Page1 component
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
  name: {
    fontSize: 26, // Set font size for the user name
    fontWeight: 'bold', // Make the user name bold
    marginBottom: 8, // Add space below the user name
  },
  bio: {
    fontSize: 16, // Set font size for the user bio
    color: '#555', // Set text color for the bio
  },
  break: {
    height: 24, // Add vertical space between elements
  },
  usersContainer: {
    width: '90%', // Set the width of the container
    alignItems: 'flex-start', // Align items to the start of the container
  },
  userBox: {
    width: '100%', // Take up the full width of the container
    backgroundColor: '#f2f2f2', // Set the background color for the user box
    borderRadius: 8, // Round the corners of the user box
    padding: 16, // Add padding inside the user box
    marginBottom: 16, // Add space below each user box
    alignItems: 'flex-start', // Align items to the start of the user box
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // Add shadow for web compatibility
    elevation: 2, // Add shadow for Android
  },
});

export default Page1; // Export the Page1 component as default