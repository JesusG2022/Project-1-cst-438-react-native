import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Navbar from '../components/Narbar';
import Title from '../components/Title';

//sample poems
const posts = [
  {
    title: 'Ocean Breeze',
    date: '09/01/2025',
    content: 'Waves crash gently,\nSalt in the air,\nDreams drift freely,\nWithout a care.',
  },
  {
    title: 'Sunset Glow',
    date: '08/28/2025',
    content: 'Orange and pink,\nThe sky ignites,\nDaylight sinks,\nInto the night.',
  },
  {
    title: 'Quiet Morning',
    date: '08/20/2025',
    content: 'Coffee steams,\nSoft light gleams,\nPeaceful scenes,\nStart new dreams.',
  },
];
const Page2 = () => {
  return (
    <View style={styles.container}>
      <Title />
      <Navbar />
      <Text style={styles.pageTitle}>Page 2</Text>
      <View style={styles.break} />
      <View style={styles.postsContainer}>
        {posts.map((post, idx) => (
          <View key={idx} style={styles.postBox}>
            <View style={styles.postHeader}>
              <Text style={styles.postTitle}>{post.title}</Text>
              <Text style={styles.postDate}>{post.date}</Text>
            </View>
            <Text style={styles.postContent}>{post.content}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
    backgroundColor: '#fff',
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 24,
    textAlign: 'center',
  },
  break: {
    height: 24,
  },
  postsContainer: {
    width: '95%',
    alignItems: 'center',
  },
  postBox: {
    width: '100%',
    minHeight: 180,
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

export default Page2;