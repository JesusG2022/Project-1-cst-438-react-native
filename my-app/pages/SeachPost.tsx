import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import type { StackNavigationProp } from '@react-navigation/stack';
import Layout from '../components/Layout';

type RootStackParamList = {
    SearchResult: { query: string };
};

const SearchPost: React.FC = () => {
    const [searchText, setSearchText] = useState('');
    const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'SearchResult'>>(); // Typed navigation

    const handleSearch = () => {
        if (searchText.trim()) {
            // Navigate to SearchResult screen with the search query as a parameter
            navigation.navigate('SearchResult', { query: searchText });
        }
    };

    return (
        <Layout>
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
        </Layout>
    );
};

const styles = StyleSheet.create({
    searchBar: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        backgroundColor: '#f9f9f9',
    },
});

export default SearchPost;