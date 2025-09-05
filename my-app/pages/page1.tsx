import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Navbar from '../components/Narbar';
import Title from '../components/Title';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Page1: undefined;
  Page2: undefined;
};

type Page1ScreenProp = NativeStackNavigationProp<RootStackParamList, 'Page1'>;


const Page1 = () => {
  const users = [
  {
    name: 'Sample User',
    bio: 'This user is a great poet! They love the beach and go to CSUMB.',
  },
  {
    name: 'Sample User 2',
    bio: 'This user loves to read! Although their writing needs some work....',
  },
  {
    name: 'Sample User 3',
    bio: 'This user is just here for the vibes.',
  },
];

//hyperlinks on user name to page 2 for now
  const navigation = useNavigation<Page1ScreenProp>();

  return (
    <View style={styles.container}>
      <Title />
      <Navbar />
      <Text style={styles.pageTitle}>User Profiles</Text>
      <View style={styles.break} />
      <View style={styles.usersContainer}>
        {users.map((user, idx) => (
          <View key={idx} style={styles.userBox}>
            <TouchableOpacity onPress={() => navigation.navigate('Page2')}>
              <Text style={[styles.name, { textDecorationLine: 'underline' }]}>{user.name}</Text>
            </TouchableOpacity>
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
    // shadowColor: '#000',
    // shadowOpacity: 0.05,
    // shadowRadius: 2,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', 
    elevation: 2,
  },
});

export default Page1;