import React from 'react';
import { View, StyleSheet } from 'react-native';
import Title from './Title';
import Navbar from '../components/Navbar';
import Logout from './Logout';
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <View style={styles.container}>
      <Title />
      <Navbar />
      <Logout />
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 10,
  },
});

export default Layout;