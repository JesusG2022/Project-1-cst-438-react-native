import React from 'react';
import { View, Text, StyleSheet,TextInput,Button } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

import Navbar from '../components/Navbar'; 
import Title from '../components/Title';  

const SearchResult: React.FC = () => {
    const route = useRoute();
    const { query } = route.params as { query: string };
    const navigation = useNavigation<any>();
    const [searchText, setSearchText] = React.useState(query);

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
            <Text>NO RESULTS FOUND</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
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
});

export default SearchResult;