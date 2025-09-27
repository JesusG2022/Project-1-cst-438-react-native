import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { addUser } from '../database/database';

type RootStackParamList = {
  Start: undefined;
  SignIn: undefined;
};

const SignUp = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [usernameError, setUsernameError] = useState(false);

  const handleSignUp = async () => {
    if (!username.trim()) {
      setUsernameError(true); // Show error if username is empty
      return;
    }

    try {
      await addUser(username, password, email, bio);
      Alert.alert(
        'Account Created',
        'Your account has been successfully created!',
        [{ text: 'OK', onPress: () => navigation.navigate('Start') }]
      );
      navigation.navigate('Start');
    } catch (error) {
      console.error('Error during sign-up:', error);
      Alert.alert('Error', 'An error occurred while creating your account. Please try again.');
      const errorElement = document.getElementById("error");
      if (errorElement) {
        errorElement.innerText = "User Already in Use. Please try again.";
      }
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
          onChangeText={(text) => {
            setUsername(text);
            setUsernameError(false); // Clear error when user types
          }}
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
          style={[styles.input, styles.bioInput]}
          placeholder="Bio"
          value={bio}
          onChangeText={setBio}
          multiline
        />
        <Button title="Sign Up" onPress={handleSignUp} />
        <View style={{ height: 20 }} />
        <Button title="Back" onPress={() => navigation.navigate('Start')} />
        <View style={{ height: 20 }} />
        <Text id ="error" style={styles.errorText}></Text>
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
    height: 80,
    textAlignVertical: 'top',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
});

export default SignUp;