import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Title from '../components/Title';
import Navbar from '../components/Narbar';

const Home = () => {
  return (
    <View style={styles.container}>
      <Title />
      <Navbar />
      <Text style={styles.pageTitle}>Home Page</Text>
      <Text style={styles.textAll}>Welcome to the home page!</Text>
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
    marginBottom: 12,
    textAlign: 'center',
  },
  textAll: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
  },
});

export default Home;