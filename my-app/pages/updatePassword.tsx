import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import Layout from '../components/Layout';
import { updateUserDetails2 } from '../database/database';
import { useUser } from '../contexts/UserContext';

const UpdatePassword = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Home'>>();
  const { currentUser } = useUser();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleUpdatePassword = async () => {
    if (!newPassword.trim() || !confirmPassword.trim()) {
      Alert.alert('Error', 'Both password fields are required.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage('Miss Match Password');
      return;
    }

    try {
      if (currentUser) {
        await updateUserDetails2(currentUser.userId, '', '', newPassword);
        Alert.alert('Success', 'Password updated successfully!');
        navigation.navigate('Home', { userId: String(currentUser.userId) });
      } else {
        Alert.alert('Error', 'No user is currently logged in.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to update password. Please try again.');
      console.error('Error updating password:', error);
    }
  };

  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.title}>Update Password</Text>
        <TextInput
          style={styles.input}
          placeholder="New Password"
          value={newPassword}
          onChangeText={(text) => {
            setNewPassword(text);
            setErrorMessage('');
          }}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={(text) => {
            setConfirmPassword(text);
            setErrorMessage('');
          }}
          secureTextEntry
        />
        <Button title="Update Password" onPress={handleUpdatePassword} />
        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
        <View style={{ marginTop: 20 }}>
          <Button
            title="Back to Home"
            onPress={() =>
              navigation.navigate({
                name: 'Home',
                params: { userId: String(currentUser?.userId ?? '') },
              })
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

export default UpdatePassword;