import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import Layout from '../components/Layout';
import { useUser } from '../contexts/UserContext';
import { getUserPasswordById } from '../database/database';

const PasswordSignIn = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'UpdatePassword'>>();
  const { currentUser } = useUser();
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignIn = async () => {
    if (!password.trim()) {
      setErrorMessage('Password cannot be empty.');
      return;
    }

    if (!currentUser) {
      setErrorMessage('No user is currently logged in.');
      return;
    }

    try {
      const storedPassword = await getUserPasswordById(currentUser.userId);

      if (storedPassword === password) {
        navigation.navigate('UpdatePassword', { userId: String(currentUser.userId) });
      } else {
        setErrorMessage('Wrong Password');
      }
    } catch (error) {
      console.error('Error verifying password:', error);
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.title}>Enter Your Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setErrorMessage('');
          }}
          secureTextEntry
        />
        <Button title="Sign in" onPress={handleSignIn} />
        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
        <View style={{ marginTop: 20 }}>
          <Button
            title="Back to Home"
            onPress={() =>
              navigation.navigate({ name: 'Home', params: { userId: String(currentUser?.userId ?? '') } })
            }
          />
        </View>
      </View>
    </Layout>
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
  input: {
    height: 40,
    borderColor: '#1976d2',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 16,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
    width: '80%',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
});

export default PasswordSignIn;