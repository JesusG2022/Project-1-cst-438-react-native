import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import Title from '../components/Title';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

const Start = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleSignIn = () => {
    navigation.navigate('SignIn');
    console.log('Sign In button clicked');
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp'); // Corrected casing
    console.log('Sign Up button clicked');
  };

  return (
    <View style={styles.container}>
      <Title />
      <Button title="Sign In" onPress={handleSignIn} />
      <View style={{ height: 20 }} />
      <Button title="Sign Up" onPress={handleSignUp} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Start;