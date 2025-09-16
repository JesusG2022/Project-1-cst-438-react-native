import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../contexts/UserContext';

const Navbar = () => {
  const navigation = useNavigation<any>();
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const handleHover = (link: string) => setHoveredLink(link);
  const handleHoverEnd = () => setHoveredLink(null);

  const routeMapping: { [key: string]: string } = {
    Home: 'Home',
    Accounts: 'Page1',
    Word: 'WordOftheDay',
    'My Posts': 'MyPoems',
    Search: 'SearchPost',
  };

  return (
    <View style={styles.navbarContainer}>
      <View style={styles.navbar}>
        {['Home', 'Accounts', 'Word', 'My Posts', 'Search'].map((link) => (
          <TouchableOpacity
            key={link}
            onPress={() => navigation.navigate(routeMapping[link])} // Use mapped route names
            onMouseEnter={() => handleHover(link)}
            onMouseLeave={handleHoverEnd}
          >
            <Text style={[styles.link, hoveredLink === link && styles.hoveredText]}>{link}</Text>
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