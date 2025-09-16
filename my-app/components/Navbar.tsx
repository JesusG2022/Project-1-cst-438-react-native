import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../contexts/UserContext';

const Navbar = () => {
  const navigation = useNavigation<any>();
  const { currentUser } = useUser();
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const handleHover = (link: string) => setHoveredLink(link);
  const handleHoverEnd = () => setHoveredLink(null);

  // Map links to their corresponding route names
  const links = [
    { label: 'Home', route: 'Home' },
    { label: 'Accounts', route: 'Page1' },
    { label: 'Word', route: 'WordOftheDay' },
    { label: 'My Posts', route: 'MyPoems' },
    { label: 'Search', route: 'SearchPost' },
  ];

  return (
    <View style={styles.navbarContainer}>
      <View style={styles.navbar}>
        {links.map(({ label, route }) => (
          <TouchableOpacity
            key={label}
            onPress={() => navigation.navigate(route)}
            onMouseEnter={() => handleHover(label)}
            onMouseLeave={handleHoverEnd}
          >
            <Text style={[styles.link, hoveredLink === label && styles.hoveredText]}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navbarContainer: {
    backgroundColor: '#1976d2',
    paddingBottom: 5,
  },
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
  hoveredText: {
    textDecorationLine: 'underline', // Add underline on hover
  },
});

export default Navbar;