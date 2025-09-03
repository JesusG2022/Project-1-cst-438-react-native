import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Navbar = () => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.navbar}>    
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text style={styles.link}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Page1')}>
        <Text style={styles.link}>Page 1</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Page2')}>
        <Text style={styles.link}>Page 2</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('WordOftheDay')}>
        <Text style={styles.link}>Word</Text>
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
});

export default Navbar;
