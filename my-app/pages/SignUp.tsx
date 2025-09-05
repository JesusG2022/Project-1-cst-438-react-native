import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { addUser } from '../database/database';

// Removed duplicate handleSignUp function from top-level scope

type RootStackParamList = {
  Start: undefined;
  SignIn: undefined;
  // add other screens here if needed
};

const SignUp = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState(''); // State for Bio

const handleSignUp = async () => {
  try {
    await addUser(username, password, email, bio); // Add user to the database
    console.log('User added successfully:', { username, password, email, bio });
    navigation.navigate('Start');
  } catch (error) {
    console.error('Error during sign-up:', error);
  }
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={[styles.input, styles.bioInput]} // Add additional styling for Bio
          placeholder="Bio"
          value={bio}
          onChangeText={setBio}
          multiline // Allow multiple lines for Bio
        />
        <Button title="Sign Up" onPress={handleSignUp} />
        <View style={{ height: 20 }} />
        <Button title="Back" onPress={() => navigation.navigate('Start')} />
        <View style={{ height: 20 }} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    maxWidth: 300,
  },
  input: {
    height: 40,
    borderColor: '#1976d2',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 16,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
  },
  bioInput: {
    height: 80, // Increase height for Bio
    textAlignVertical: 'top', // Align text to the top
  },
});

export default SignUp;