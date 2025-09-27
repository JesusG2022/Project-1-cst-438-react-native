import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { getPostsByUsername } from '../database/database';
import Layout from '../components/Layout';

const Page2 = () => {
  const route = useRoute();
  const { username } = route.params as { username: string };
  const [posts, setPosts] = useState<{ PostId: number; Date: string; Title: string; text_quote: string }[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const dbPosts = await getPostsByUsername(username);
      setPosts(dbPosts as { PostId: number; Date: string; Title: string; text_quote: string }[]);
    };
    fetchPosts();
  }, [username]);

  return (
    <Layout>
      <Text style={styles.pageTitle}>{username}'s Posts</Text>
      <View style={styles.break} />
      <ScrollView style={styles.postsContainer}>
        {posts.length === 0 && <Text style={styles.noPosts}>No posts found for this user.</Text>}
        {posts.map((post) => (
          <View key={post.PostId} style={styles.postBox}>
            <View style={styles.postHeader}>
              <Text style={styles.postTitle}>{post.Title}</Text>
              <Text style={styles.postDate}>{post.Date}</Text>
            </View>
            <Text style={styles.postContent}>{post.text_quote}</Text>
          </View>
        ))}
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  pageTitle: { fontSize: 24, fontWeight: 'bold', marginTop: 24, textAlign: 'center' },
  break: { height: 24 },
  postsContainer: { width: '95%', alignSelf: 'center' },
  postBox: { backgroundColor: '#e6e6fa', borderRadius: 12, padding: 20, marginBottom: 24 },
  postHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  postTitle: { fontSize: 20, fontWeight: 'bold' },
  postDate: { fontSize: 14, color: '#888' },
  postContent: { fontSize: 18, color: '#444', lineHeight: 28 },
  noPosts: { textAlign: 'center', color: '#888', marginTop: 20 },
});

export default Page2;