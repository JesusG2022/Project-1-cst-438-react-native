import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { searchPosts } from '../database/database'; // Import the searchPosts function
import Navbar from '../components/Navbar';
import Title from '../components/Title';

const SearchResult: React.FC = () => {
  const route = useRoute();
  const { query } = route.params as { query: string };
  const navigation = useNavigation<any>();
  const [searchText, setSearchText] = useState(query);
  const [results, setResults] = useState<{ Date: string; text_quote: string }[]>([]);

  // Fetch search results when the component mounts or the query changes
  useEffect(() => {
    const fetchResults = async () => {
      const posts = await searchPosts(query);
      setResults(posts as { Date: string; text_quote: string }[]);
    };
    fetchResults();
  }, [query]);

  const handleSearch = () => {
    navigation.navigate('SearchResult', { query: searchText });
  };

  return (
    <View style={styles.container}>
      <Title />
      <Navbar />
      <View style={{ height: 30 }} />
      <TextInput
        style={styles.searchBar}
        placeholder="Search posts..."
        value={searchText}
        onChangeText={setSearchText}
        autoCapitalize="none"
        autoCorrect={false}
        clearButtonMode="while-editing"
      />
      <View style={{ height: 30 }} />
      <Button title="Search" onPress={handleSearch} />
      <Text style={styles.resultText}>Search Results for: "{query}"</Text>
      <View style={{ height: 40 }} />
      <ScrollView>
        {results.length === 0 ? (
          <Text style={styles.noResults}>NO RESULTS FOUND</Text>
        ) : (
          results.map((result, index) => (
            <View key={index} style={styles.resultBox}>
              <Text style={styles.resultDate}>{result.Date}</Text>
              <Text style={styles.resultText}>{result.text_quote}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flex: 1,
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f9f9f9',
  },
  resultText: {
    fontSize: 18,
    marginTop: 16,
  },
  noResults: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
  resultBox: {
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
  },
  resultDate: {
    fontSize: 14,
    color: '#888',
    marginBottom: 8,
  },
});

export default SearchResult;