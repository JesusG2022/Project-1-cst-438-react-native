import React from 'react';
import { Text, StyleSheet } from 'react-native';

const Title = () => (
  <Text style={styles.title}>Welcome to group 9 project 1</Text>
);

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
});

export default Title;