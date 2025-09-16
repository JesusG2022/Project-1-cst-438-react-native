import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../contexts/UserContext';

const Logout = () => {
  const navigation = useNavigation<any>();
  const { logout } = useUser();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <View style={styles.logoutContainer}>
      <TouchableOpacity
        onPress={() => {
          logout();
          navigation.navigate('Start');
        }}
      >
        <Text style={styles.logoutLink}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  logoutContainer: {
    alignItems: 'center',
    marginTop: 24,
    width: '100%',
    paddingVertical: 8,
  },
  logoutLink: {
    backgroundColor: '#1976d2',
    color: '#ff0000ff',
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    textAlign: 'center',
  },
  hoveredText: {
    textDecorationLine: 'underline', // Add underline on hover
  },
});

export default Logout;