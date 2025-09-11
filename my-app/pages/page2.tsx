import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView }  from 'react-native'; // Import necessary components from React Native
import Navbar from '../components/Navbar'; // Import the Navbar component for navigation links
import Title from '../components/Title'; // Import the Title component for the page title
import { useRoute } from '@react-navigation/native';
import { getPostsByUsername } from '../database/database';

// Page2 component: Represents the second page of the app
const Page2 = () => {
  const route = useRoute();
  const { username } = route.params as { username: string };
  const [posts, setPosts] = useState<{ PostId: number; Date: string; Title: string; text_quote: string }[]>([]); // Add title and post id

  // Function to format date from YYYY-MM-DD to "Month Day, Year" format
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString; // Return original string if formatting fails
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const dbPosts = await getPostsByUsername(username);
      setPosts(dbPosts as { PostId: number; Date: string; Title: string; text_quote: string }[]); // Add title and post id
    };
    fetchPosts();
  }, [username]);

  return (
    <View style={styles.container}>
      <Title />
      <Navbar />
      <Text style={styles.pageTitle}>{username}'s Posts</Text>
    <View style={styles.break} />
      <ScrollView style={styles.postsContainer}>
        {posts.length === 0 && (
          <Text style={{ textAlign: 'center', color: '#888', marginTop: 20 }}>
            No posts found for this user.
          </Text>
        )}
        {posts.map((post, idx) => (
          // Add post id to the key
          <View key={post.PostId} style={styles.postBox}>
            <View style={styles.postHeader}>
              <Text style={styles.postTitle}>{post.Title || `Post #${idx + 1}`}</Text>
              <Text style={styles.postDate}>{formatDate(post.Date)}</Text> // format date
            </View>
            <Text style={styles.postContent}>{post.text_quote}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

// Styles for the Page2 component
const styles = StyleSheet.create({
  container: {
    flex: 1, // Take up the full screen
    alignItems: 'center', // Center items horizontally
    paddingTop: 40, // Add padding at the top
    backgroundColor: '#fff', // Set the background color to white
  },
  pageTitle: {
    fontSize: 24, // Set font size for the page title
    fontWeight: 'bold', // Make the page title bold
    marginTop: 24, // Add space above the page title
    textAlign: 'center', // Center-align the page title
  },
    break: {
    height: 24,
  },
  postsContainer: {
    width: '95%',
    alignSelf: 'center',
  },
  postBox: {
    width: '100%',
    minHeight: 140,
    backgroundColor: '#e6e6fa',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
    justifyContent: 'flex-start',
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  postTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  postDate: {
    fontSize: 14,
    color: '#888',
  },
  postContent: {
    fontSize: 18,
    color: '#444',
    lineHeight: 28,
  },
});

export default Page2; // Export the Page2 component as default