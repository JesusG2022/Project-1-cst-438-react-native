import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import * as SQLite from 'expo-sqlite';

type RootStackParamList = {
  Home: { userId: number };
  Start: undefined;
  SignUp: undefined;
};

const SignIn = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

const handleSignIn = async () => {
  try {
    const db = await SQLite.openDatabaseAsync('databaseName');
    const row = await db.getFirstAsync<{ UserId: number }>(
      `SELECT UserId FROM User13 WHERE Username = ? AND Password = ?`,
      [username, password]
    );
    if (row && row.UserId) {
      setErrorMessage('');
      navigation.navigate('Home', { userId: row.UserId });
    } else {
      setErrorMessage('Wrong username or password');
    }
  } catch (error) {
    console.error('Error during sign-in:', error);
    setErrorMessage('An error occurred. Please try again.');
  }
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
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
        <Button title="Sign In" onPress={handleSignIn} />
        <View style={{ height: 20 }} />
        <Button title="Back" onPress={() => navigation.navigate('Start')} />
        <View style={{ height: 20 }} />
        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
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
  errorText: {
    marginTop: 16,
    color: 'red',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default SignIn;