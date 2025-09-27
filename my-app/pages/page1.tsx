import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { getAllUsers } from '../database/database';
import { RootStackParamList } from '../App';
import Layout from '../components/Layout';

type Page1ScreenProp = NativeStackNavigationProp<RootStackParamList, 'Page1'>;

const Page1 = () => {
  const [users, setUsers] = useState<{ Username: string; Bio: string }[]>([]);
  const navigation = useNavigation<Page1ScreenProp>();

  useEffect(() => {
    const fetchUsers = async () => {
      const dbUsers = await getAllUsers();
      setUsers(dbUsers as { Username: string; Bio: string }[]);
    };
    fetchUsers();
  }, []);

  return (
    <Layout>
      <Text style={styles.pageTitle}>User Profiles</Text>
      <View style={styles.break} />
      <View style={styles.usersContainer}>
        {users.map((user, idx) => (
          <View key={idx} style={styles.userBox}>
            <TouchableOpacity onPress={() => navigation.navigate('Page2', { username: user.Username })}>
              <Text style={[styles.name, { textDecorationLine: 'underline' }]}>{user.Username}</Text>
            </TouchableOpacity>
            <Text style={styles.bio}>{user.Bio}</Text>
          </View>
        ))}
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  pageTitle: { fontSize: 24, fontWeight: 'bold', marginTop: 24, textAlign: 'center' },
  name: { fontSize: 26, fontWeight: 'bold', marginBottom: 8 },
  bio: { fontSize: 16, color: '#555', textAlign: 'center' },
  break: { height: 24 },
  usersContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    width: '100%' 
  },
  userBox: { 
    width: '90%', 
    backgroundColor: '#f2f2f2', 
    borderRadius: 8, 
    padding: 16, 
    marginBottom: 16, 
    alignItems: 'center' 
  },
});

export default Page1;