import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Navbar from '../components/Narbar';
import Title from '../components/Title';

const users = [
  {
    name: 'Sample User',
    bio: 'This user is a great poet! They love the beach and go to CSUMB.',
  //include image later
  },
  {
    name: 'Sample User 2',
    bio: 'This user loves to read! Although their writing needs some work....',
  //include image later
  },
  {
    name: 'Sample User 3',
    bio: 'This user is just here for the vibes.',
  //include image later
  },
];

const Page1 = () => {
  return (
    <View style={styles.container}>
      <Title />
      <Navbar />
      <Text style={styles.pageTitle}>Page 1</Text>
      <View style={styles.break} />
      <View style={styles.usersContainer}>
        {users.map((user, idx) => (
          <View key={idx} style={styles.userBox}>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.bio}>{user.bio}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
    backgroundColor: '#fff',
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 24,
    textAlign: 'center',
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  bio: {
    fontSize: 16,
    color: '#555',
  },
  break: {
    height: 24,
  },
  usersContainer: {
    width: '90%',
    alignItems: 'flex-start',
  },
  userBox: {
    width: '100%',
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
});

export default Page1;