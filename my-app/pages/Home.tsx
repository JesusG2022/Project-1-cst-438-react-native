// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';
import Title from '../components/Title';
import Navbar from '../components/Navbar';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
type HomeProps = StackScreenProps<RootStackParamList, 'Home'>;


import { RouteProp } from '@react-navigation/native';

// type HomeProps = {
//   route: RouteProp<{ params: { userId: string } }, 'params'>;
// };

const Home: React.FC<HomeProps> = ({ route }) => {
  const { userId } = route.params;
  console.log('User ID:', userId);
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