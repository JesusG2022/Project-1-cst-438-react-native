import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Button,
} from "react-native";
import { useUser } from "../contexts/UserContext";
import {
  getPostsByUserId,
  getAllPostsByDay,
  getAllUsers,
} from "../database/database";
import Layout from "../components/Layout";
import { useNavigation } from "@react-navigation/native";

type RootStackParamList = {
  Update: { userId: number };
  PasswordSignIn: undefined;
  // Add other routes here as needed
};

import { StackNavigationProp } from "@react-navigation/stack";

interface Post {
  PostId: number;
  UserId: number;
  Date: string;
  Title: string;
  text_quote: string;
  Username: string;
}

const formatDate = (dateString: string): string => {
  try {
    const [year, month, day] = dateString.split("-").map(Number);
    const date = new Date(year, month - 1, day);

    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    }

    if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    }

    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch (error) {
    return dateString;
  }
};

const Home = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { currentUser } = useUser();
  const [postCount, setPostCount] = useState<number>(0);
  const [dailyPosts, setDailyPosts] = useState<Post[]>([]);
  const [bio, setBio] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser) {
        const posts = await getPostsByUserId(currentUser.userId);
        setPostCount(posts.length);

        // Fetch the bio of the current user
        const users = await getAllUsers();
        const user = users.find(
          (u) =>
            (u as { Username: string; Bio?: string }).Username ===
            currentUser.username
        ) as { Username: string; Bio?: string } | undefined;
        if (user) {
          setBio(user.Bio || "");
        }
      }

      const allPosts = await getAllPostsByDay();
      setDailyPosts(allPosts as Post[]);
    };

    fetchData();
  }, [currentUser]);

  return (
    <Layout>
      <ScrollView style={styles.container}>
        <Text style={styles.pageTitle}>Home Page</Text>
        <Image source={require("../img/jim carry.gif")} style={styles.image} />
        <View style={{ height: 20 }} />
        <Button
          title="Update Profile"
          onPress={() => {
            if (currentUser) {
              navigation.navigate("Update", { userId: currentUser.userId });
            }
          }}
        />
        <View style={{ height: 20 }} />
        <Button
          title="Update Password"
          onPress={() => {
            navigation.navigate('PasswordSignIn');
          }}
        />
        <View style={{ height: 20 }} />
        {currentUser && (
          <View style={styles.userInfo}>
            <Text style={styles.infoText}>
              Username: {currentUser.username}
            </Text>
            <Text style={styles.infoText}>Bio: {bio}</Text>
          </View>
        )}
        <Text style={[styles.infoText, styles.centerText]}>
          Post Count: {postCount}
        </Text>
        <View>
          <ScrollView>
            <View style={styles.dailyPostsSection}>
              <Text style={styles.sectionTitle}>Daily Posts</Text>
              {dailyPosts.length > 0 ? (
                dailyPosts.map((post) => (
                  <View key={post.PostId} style={styles.postCard}>
                    <View style={styles.postHeader}>
                      <Text style={styles.postTitle}>{post.Title}</Text>
                      <Text style={styles.postDate}>
                        {formatDate(post.Date)}
                      </Text>
                    </View>
                    <Text style={styles.postAuthor}>By: {post.Username}</Text>
                    <Text style={styles.postContent}>{post.text_quote}</Text>
                  </View>
                ))
              ) : (
                <Text style={styles.noPostsText}>No posts available</Text>
              )}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
    paddingTop: 40,
  },
  userInfo: {
    marginTop: 20,
    alignItems: "center",
  },
  infoText: {
    fontSize: 18,
    color: "#333",
    marginBottom: 8,
  },
  centerText: {
    textAlign: "center", // Center-align the text
  },
  image: {
    width: 500,
    height: 275,
    alignSelf: "center",
    resizeMode: "contain",
  },
  dailyPostsSection: {
    marginTop: 30,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#333",
  },
  postCard: {
    backgroundColor: "#f8f9fa",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#e9ecef",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  postHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
    marginRight: 10,
  },
  postDate: {
    fontSize: 14,
    color: "#666",
    fontStyle: "italic",
  },
  postAuthor: {
    fontSize: 14,
    color: "#007bff",
    marginBottom: 8,
    fontWeight: "500",
  },
  postContent: {
    fontSize: 16,
    color: "#555",
    lineHeight: 22,
  },
  noPostsText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    fontStyle: "italic",
    marginTop: 20,
  },
});

export default Home;
