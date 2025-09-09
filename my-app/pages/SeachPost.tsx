import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Navbar from '../components/Navbar'; 
import Title from '../components/Title';  

const SearchPost: React.FC = () => {
    const [searchText, setSearchText] = useState('');
    const navigation = useNavigation<any>();

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
});

export default SearchPost;