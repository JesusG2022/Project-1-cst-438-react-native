import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useUser } from '../contexts/UserContext';
import { getPostsByUserId } from '../database/database';
import Layout from '../components/Layout';

const Home = () => {
  const { currentUser } = useUser();
  const [postCount, setPostCount] = useState<number>(0);

  useEffect(() => {
    const fetchPostCount = async () => {
      if (currentUser) {
        const posts = await getPostsByUserId(currentUser.userId);
        setPostCount(posts.length);
      }
    };

    fetchPostCount();
  }, [currentUser]);

  return (
    <Layout>
      <View style={styles.container}>
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
      </View>
    </Layout>
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
    marginBottom: 12,
    textAlign: 'center',
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
    // marginBottom: 5,
    resizeMode: 'contain',
  },
});

export default Home;