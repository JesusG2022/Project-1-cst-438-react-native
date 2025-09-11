import React, { useState, useEffect } from 'react';
import { View,Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert,Modal } from 'react-native';
import Title from '../components/Title';
import Navbar from '../components/Navbar';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import { addPost, getPostsByUserId, updatePost, deletePost } from '../database/database';
import { useUser } from '../contexts/UserContext'; // Import user context for authentication

// Define the type for post data
interface Post {
  PostId: number;
  Title: string;
  text_quote: string;
  Date: string;
}

// Define the type for the MyPoems screen props
type MyPoemsProps = StackScreenProps<RootStackParamList, 'MyPoems'>;

// MyPoems component: Allows users to manage their poems posts
const MyPoems: React.FC<MyPoemsProps> = () => {
  const { currentUser } = useUser(); // Get current user from context instead of route params
  const [posts, setPosts] = useState<Post[]>([]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [postToDelete, setPostToDelete] = useState<Post | null>(null);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch posts when component mounts or current user changes
  useEffect(() => {
    if (currentUser) {
      fetchPosts();
    }
  }, [currentUser]);

  // Function to fetch posts from database for the current user
  const fetchPosts = async () => {
    if (!currentUser) {
      Alert.alert('Error', 'Please log in to view your posts');
      return;
    }

    try {
      setLoading(true);
      // Fetch posts for the current user from context
      const userPosts = await getPostsByUserId(currentUser.userId);
      setPosts(userPosts as Post[]);
    } catch (error) {
      console.error('Error fetching posts:', error);
      Alert.alert('Error', 'Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };


  // Function to handle adding a new post for the current user
  const handleAddPost = async () => {
    if (!newTitle.trim() || !newContent.trim()) {
      Alert.alert('Error', 'Please fill in both title and content');
      return;
    }

    if (!currentUser) {
      Alert.alert('Error', 'Please log in to add posts');
      return;
    }

    try {
      // Add post for the current user from context
      await addPost(currentUser.userId, newTitle.trim(), newContent.trim());
      
      setNewTitle('');
      setNewContent('');
      setIsAddModalVisible(false);
      fetchPosts(); // Refresh posts list
      Alert.alert('Success', 'Post added successfully!');
    } catch (error) {
      console.error('Error adding post:', error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      Alert.alert('Error', `Failed to add post: ${errorMessage}`);
    }
  };

  // Function to handle editing a post
  const handleEditPost = async () => {
    if (!editingPost || !newTitle.trim() || !newContent.trim()) {
      Alert.alert('Error', 'Please fill in both title and content');
      return;
    }

    try {
      console.log('Updating post with:', { postId: editingPost.PostId, title: newTitle, content: newContent });
      await updatePost(editingPost.PostId, newTitle.trim(), newContent.trim());
      setNewTitle('');
      setNewContent('');
      setEditingPost(null);
      setIsEditModalVisible(false);
      fetchPosts(); // Refresh the list
      Alert.alert('Success', 'Post updated successfully!');
    } catch (error) {
      console.error('Error updating post:', error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      Alert.alert('Error', `Failed to update post: ${errorMessage}`);
    }
  };

  // Function to handle deleting a post
  const handleDeletePost = (post: Post) => {
    setPostToDelete(post);
    setIsDeleteModalVisible(true);
  };

  // Function to confirm delete
  const confirmDelete = async () => {
    if (!postToDelete) return;
    
    try {
      const result = await deletePost(postToDelete.PostId);
      
      if (result && result.changes > 0) {
        await fetchPosts(); // Refresh the list
        setIsDeleteModalVisible(false);
        setPostToDelete(null);
        Alert.alert('Success', 'Post deleted successfully!');
      } else {
        Alert.alert('Error', 'Post was not found or already deleted');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      Alert.alert('Error', `Failed to delete post: ${errorMessage}`);
    }
  };

  // Function to cancel delete
  const cancelDelete = () => {
    setIsDeleteModalVisible(false);
    setPostToDelete(null);
  };


  // Function to open edit modal
  const openEditModal = (post: Post) => {
    setEditingPost(post);
    setNewTitle(post.Title || '');
    setNewContent(post.text_quote);
    setIsEditModalVisible(true);
  };

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

  // Function to close modals and reset form
  const closeModals = () => {
    setIsAddModalVisible(false);
    setIsEditModalVisible(false);
    setIsDeleteModalVisible(false);
    setEditingPost(null);
    setPostToDelete(null);
    setNewTitle('');
    setNewContent('');
  };

  return (
    <View style={styles.container}>
      <Title />
      <Navbar />
      <Text style={styles.pageTitle}>My Posts</Text>
      
      <View style={styles.break} />
      
      {/* Add Post Button */}
      <TouchableOpacity 
        style={styles.addButton} 
        onPress={() => setIsAddModalVisible(true)}
      >
        <Text style={styles.addButtonText}>+ Add New Post</Text>
      </TouchableOpacity>


      <View style={styles.break} />

      {/* Posts List */}
      <ScrollView 
        style={styles.postsContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
      >
        {loading ? (
          <Text style={styles.loadingText}>Loading posts...</Text>
        ) : posts.length === 0 ? (
          <Text style={styles.emptyText}>No posts yet. Add your first post!</Text>
        ) : (
          posts.map((post, idx) => (
            <View key={post.PostId} style={styles.postBox}>
              <View style={styles.postHeader}>
                <Text style={styles.postTitle}>{post.Title || `Post #${idx + 1}`}</Text>
                <Text style={styles.postDate}>{formatDate(post.Date)}</Text>
              </View>
              <Text style={styles.postContent}>{post.text_quote}</Text>
              <View style={styles.postActions}>
                <TouchableOpacity 
                  style={styles.editButton} 
                  onPress={() => openEditModal(post)}
                >
                  <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.deleteButton} 
                  onPress={() => handleDeletePost(post)}
                >
                  <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      {/* Add Post Modal */}
      <Modal
        visible={isAddModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModals}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Post</Text>
            <TextInput
              style={styles.input}
              placeholder="Post Title"
              value={newTitle}
              onChangeText={setNewTitle}
            />
            <TextInput
              style={[styles.input, styles.contentInput]}
              placeholder="Post Content"
              value={newContent}
              onChangeText={setNewContent}
              multiline
              numberOfLines={6}
            />
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.cancelButton} onPress={closeModals}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={handleAddPost}>
                <Text style={styles.buttonText}>Add Post</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Edit Post Modal */}
      <Modal
        visible={isEditModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModals}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Post</Text>
            <TextInput
              style={styles.input}
              placeholder="Post Title"
              value={newTitle}
              onChangeText={setNewTitle}
            />
            <TextInput
              style={[styles.input, styles.contentInput]}
              placeholder="Post Content"
              value={newContent}
              onChangeText={setNewContent}
              multiline
              numberOfLines={6}
            />
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.cancelButton} onPress={closeModals}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={handleEditPost}>
                <Text style={styles.buttonText}>Update Post</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        visible={isDeleteModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={cancelDelete}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Delete Post</Text>
            <Text style={styles.deleteMessage}>
              Are you sure you want to delete "{postToDelete?.Title}"?
            </Text>
            <Text style={styles.deleteWarning}>
              This action cannot be undone.
            </Text>
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.cancelButton} onPress={cancelDelete}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteConfirmButton} onPress={confirmDelete}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// Styles for the MyPoems component
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
  break: {
    height: 24,
  },
  addButton: {
    backgroundColor: '#1976d2',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  postsContainer: {
    flex: 1,
    width: '95%',
    alignSelf: 'center',
  },
  scrollContent: {
    paddingBottom: 20,
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
    flex: 1,
  },
  postDate: {
    fontSize: 14,
    color: '#888',
  },
  postContent: {
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
    marginBottom: 16,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  editButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  deleteButton: {
    backgroundColor: '#f44336',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  loadingText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 20,
    fontSize: 16,
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 20,
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
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
  },
  contentInput: {
    height: 120,
    textAlignVertical: 'top',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: '#888',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
  },
  saveButton: {
    backgroundColor: '#1976d2',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
  },
  deleteMessage: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  deleteWarning: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
    color: '#f44336',
    fontStyle: 'italic',
  },
  deleteConfirmButton: {
    backgroundColor: '#f44336',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
  },
});

export default MyPoems;