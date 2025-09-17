// Import necessary components and modules
import Title from '../components/Title'; // Import the Title component for the page title
import Navbar from '../components/Navbar'; // Import the Navbar component for navigation links
import React from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native'; // Import React Native components
import { StackScreenProps } from '@react-navigation/stack'; // Import type for stack screen props
import { RootStackParamList } from '../App'; // Import the RootStackParamList type from App.tsx
import { getPostsByDate } from '../database/database'; // Import the function to get posts by date
import { getTodayString } from './WordOftheDay'; // Import date utility functions

// Define the type for the Home screen props
type HomeProps = StackScreenProps<RootStackParamList, 'Home'>;

type Post = {
  PostId: number;
  Title: string;
  text_quote: string;
  Date: string; // YYYY-MM-DD
};

// Home component: Displays the home page of the app
const Home: React.FC<HomeProps> = ({ route }) => {
  // Extract the userId parameter from the route props
  const { userId } = route.params;

  // Log the userId to the console for debugging purposes
  console.log('User ID:', userId);

  const [posts, setPosts] = React.useState<Post[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const formatDate = (dateString: string) => {
    try {
      // Keep display friendly; storage stays YYYY-MM-DD
      const d = new Date(dateString);
      return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch {
      return dateString;
    }
  };

  const loadToday = async () => {
    setLoading(true);
    try {
      const today = getTodayString(); // matches addPost() date format
      const rows = await getPostsByDate(today);
      setPosts(rows);
    } catch (e) {
      console.error('Error loading today posts:', e);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    loadToday();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await loadToday();
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <View style={styles.container}>
      <Title />
      <Navbar />
      <Text style={styles.pageTitle}>Home Page</Text>
      <Text style={styles.textAll}>Welcome to the home page! View today's poems</Text>

      <ScrollView
        style={styles.postsContainer}
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        showsVerticalScrollIndicator
      >
        <Text style={styles.sectionTitle}>Today’s Posts</Text>

        {loading ? (
          <Text style={styles.loadingText}>Loading today’s posts…</Text>
        ) : posts.length === 0 ? (
          <Text style={styles.emptyText}>No posts yet for today.</Text>
        ) : (
          posts.map((post, idx) => (
            <View key={post.PostId} style={styles.postBox}>
              <View style={styles.postHeader}>
                <Text style={styles.postTitle}>{post.Title || `Post #${idx + 1}`}</Text>
                <Text style={styles.postDate}>{formatDate(post.Date)}</Text>
              </View>
              <Text style={styles.postContent}>{post.text_quote}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

// Styles for the Home component
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
    marginBottom: 12,
    textAlign: 'center',
  },
  textAll: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
    marginBottom: 12,
  },

  // New styles for list
  postsContainer: { width: '100%', paddingHorizontal: 16 },
  scrollContent: { paddingBottom: 32 },
  sectionTitle: { fontSize: 20, fontWeight: '700', marginVertical: 8 },
  loadingText: { textAlign: 'center', marginTop: 12 },
  emptyText: { textAlign: 'center', marginTop: 12, opacity: 0.7 },
  postBox: {
    borderWidth: 1, borderColor: '#ddd', borderRadius: 12,
    padding: 12, marginBottom: 12, backgroundColor: '#fafafa'
  },
  postHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  postTitle: { fontSize: 16, fontWeight: '600', flex: 1, paddingRight: 8 },
  postDate: { fontSize: 12, opacity: 0.7 },
  postContent: { fontSize: 14, lineHeight: 20 },
});

export default Home;

//   return (
//     <View style={styles.container}>
//       <Title />
//       <Navbar />
//       <Text style={styles.pageTitle}>Home Page</Text>
//       <Text style={styles.textAll}>Welcome to the home page! View today's poems</Text>
//     </View>
//   );
// };



// // Styles for the Home component
// const styles = StyleSheet.create({
//   container: {
//     flex: 1, // Take up the full screen
//     alignItems: 'center', // Center items horizontally
//     paddingTop: 40, // Add padding at the top
//     backgroundColor: '#fff', // Set the background color to white
//   },
//   pageTitle: {
//     fontSize: 24, // Set font size for the page title
//     fontWeight: 'bold', // Make the page title bold
//     marginTop: 24, // Add space above the page title
//     marginBottom: 12, // Add space below the page title
//     textAlign: 'center', // Center-align the page title
//   },
//   textAll: {
//     fontSize: 16, // Set font size for the welcome message
//     textAlign: 'center', // Center-align the welcome message
//     color: '#333', // Set the text color
//   },
// });

// export default Home; // Export the Home component as default