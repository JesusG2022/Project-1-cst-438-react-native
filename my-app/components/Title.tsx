import React from 'react';
import { Text, StyleSheet } from 'react-native';

const Title = () => (
  <Text style={styles.title}>Poet's Pick!</Text>
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