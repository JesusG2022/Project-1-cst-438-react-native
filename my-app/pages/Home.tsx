import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useUser } from '../contexts/UserContext';
import { getPostsByUserId, getAllPostsByDay } from '../database/database';
import Layout from '../components/Layout';

interface Post {
  PostId: number;
  UserId: number;
  Date: string;
  Title: string;
  text_quote: string;
  Username: string;
}

// Function to format date for display
const formatDate = (dateString: string): string => {
  try {
    
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day); // month is 0-indexed
    
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    // Check if it's today
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    }
    
    // Check if it's yesterday
    if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    }
    
    // For other dates, show the formatted date
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch (error) {
    return dateString; // Return original string if parsing fails
  }
};

const Home = () => {
  const { currentUser } = useUser();
  const [postCount, setPostCount] = useState<number>(0);
  const [dailyPosts, setDailyPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser) {
        const posts = await getPostsByUserId(currentUser.userId);
        setPostCount(posts.length);
      }
      
      // Fetch all daily posts
      const allPosts = await getAllPostsByDay();
      setDailyPosts(allPosts as Post[]);
    };

    fetchData();
  }, [currentUser]);

  return (
    <Layout>
      <ScrollView style={styles.container}>
        <Text style={styles.pageTitle}>Home Page</Text>
        <Image
          source={require('../img/jim carry.gif')}
          style={styles.image}
        />
        {currentUser && (
          <View style={styles.userInfo}>
            <Text style={styles.infoText}>Username: {currentUser.username}</Text>
            <Text style={styles.infoText}>User ID: {currentUser.userId}</Text>
            <Text style={styles.infoText}>Post Count: {postCount}</Text>
          </View>
        )}
        
        {/* Daily Posts Section */}
        <View style={styles.dailyPostsSection}>
          <Text style={styles.sectionTitle}>Daily Posts</Text>
          {dailyPosts.length > 0 ? (
            dailyPosts.map((post) => (
              <View key={post.PostId} style={styles.postCard}>
                <View style={styles.postHeader}>
                  <Text style={styles.postTitle}>{post.Title}</Text>
                  <Text style={styles.postDate}>{formatDate(post.Date)}</Text>
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
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
    paddingTop: 40,
  },
  userInfo: {
    marginTop: 20,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 8,
  },
  image: {
    width: 500,
    height: 275,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  dailyPostsSection: {
    marginTop: 30,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#333',
  },
  postCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e9ecef',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    marginRight: 10,
  },
  postDate: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  postAuthor: {
    fontSize: 14,
    color: '#007bff',
    marginBottom: 8,
    fontWeight: '500',
  },
  postContent: {
    fontSize: 16,
    color: '#555',
    lineHeight: 22,
  },
  noPostsText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 20,
  },
});

export default Home;