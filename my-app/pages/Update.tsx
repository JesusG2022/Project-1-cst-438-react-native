import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useUser } from "../contexts/UserContext";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { updateUserDetails, getAllUsers } from "../database/database";
import Layout from "../components/Layout";

interface User {
  UserId: number;
  Username: string;
  Email: string;
  Bio: string;
}

type RootStackParamList = {
  Home: undefined;
};

const Update = () => {
  const { currentUser } = useUser();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentEmail, setCurrentEmail] = useState("");
  const [currentBio, setCurrentBio] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (currentUser) {
        const users = (await getAllUsers()) as User[];
        const user = users.find((u: User) => u.Username === currentUser.username);
        if (user) {
          setCurrentEmail(user.Email || "");
          setCurrentBio(user.Bio || "");
        }
      }
    };

    fetchUserDetails();
  }, [currentUser]);

  const handleUpdate = async () => {
    if (!currentUser) {
      Alert.alert("Error", "You must be logged in to update your details.");
      return;
    }

    if (!email.trim() && !bio.trim()) {
      Alert.alert("Error", "Please fill in at least one field to update.");
      return;
    }

    setLoading(true);
    try {
      await updateUserDetails(currentUser.userId, email || currentEmail, bio || currentBio);
      Alert.alert("Success", "Your details have been updated.");
      navigation.navigate("Home");
    } catch (error) {
      Alert.alert("Error", "Failed to update details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Text style={styles.title}>Update Your Details</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder={currentEmail || "New Email"}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={[styles.input, styles.bioInput]}
          placeholder={currentBio || "New Bio"}
          value={bio}
          onChangeText={setBio}
          multiline
        />
        <Button
          title={loading ? "Updating..." : "Update"}
          onPress={handleUpdate}
          disabled={loading}
        />
        <View style={{ marginTop: 20 }}>
          <Button title="Back to Home" onPress={() => navigation.navigate('Home')} />
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  form: {
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    borderColor: "#1976d2",
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 16,
    paddingHorizontal: 8,
    backgroundColor: "#fff",
  },
  bioInput: {
    height: 80,
    textAlignVertical: "top",
  },
});

export default Update;