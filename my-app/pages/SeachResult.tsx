import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Image, Button } from 'react-native';
import { useRoute, useNavigation, NavigationProp } from '@react-navigation/native';
import { searchPosts } from '../database/database';
import Layout from '../components/Layout';

type RootStackParamList = {
  SearchResult: { query: string };
  // add other screens here if needed
};

const SearchResult = () => {
  const route = useRoute();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { query } = route.params as { query: string };
  const [results, setResults] = useState<{ Date: string; text_quote: string }[]>([]);
  const [filteredResults, setFilteredResults] = useState<{ Date: string; text_quote: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState(query);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const posts = await searchPosts(query);
        setResults(posts as { Date: string; text_quote: string }[]);
        setFilteredResults(posts as { Date: string; text_quote: string }[]);
      } catch (error) {
        console.error('Error fetching search results:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  const handleSearch = () => {
    if (searchText.trim() === '') {
      setFilteredResults(results); // Reset to all results if search text is empty
    } 
            if (searchText.trim()) {
            // Navigate to SearchResult screen with the search query as a parameter
            navigation.navigate('SearchResult', { query: searchText });
        }
  };

  return (
    <Layout>
      <Text style={styles.pageTitle}>Search Results</Text>
      <Image
        source={require('../img/hand-writing-close-up-animated-gif.gif')}
        style={styles.image}
      />
      <TextInput
        style={styles.searchBar}
        placeholder="Search posts..."
        value={searchText}
        onChangeText={setSearchText}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <View style={{ height: 20 }} />
      <Button title="Search" onPress={handleSearch} />
      {loading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : filteredResults.length === 0 ? (
        <Text style={styles.noResultsText}>No results found.</Text>
      ) : (
        <ScrollView style={styles.resultsContainer}>
          {filteredResults.map((result, index) => (
            <View key={index} style={styles.resultBox}>
              <Text style={styles.resultDate}>{result.Date}</Text>
              <Text style={styles.resultText}>{result.text_quote}</Text>
            </View>
          ))}
        </ScrollView>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
  },
  image: {
    width: 300,
    height: 200,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 20,
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f9f9f9',
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#888',
  },
  noResultsText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#888',
  },
  resultsContainer: {
    padding: 10,
  },
  resultBox: {
    marginBottom: 16,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  resultDate: {
    fontSize: 14,
    color: '#888',
    marginBottom: 4,
  },
  resultText: {
    fontSize: 16,
    color: '#333',
  },
});

export default SearchResult;