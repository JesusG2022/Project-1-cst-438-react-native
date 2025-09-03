// pages/WordOftheDay.tsx
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView } from 'react-native';

const WordOftheDay: React.FC = () => {
  const [word, setWord] = useState('');
  const [definition, setDefinition] = useState('');
  const [error, setError] = useState('');

  async function fetchData() {
    try {
      if (!word.trim()) {
        setError('Please enter a word');
        return;
      }
      setError('');
      setDefinition('Loading...');

      const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase().trim()}`);
      if (!res.ok) throw new Error('Could not fetch resource');

      const data = await res.json();
      const def = data?.[0]?.meanings?.[0]?.definitions?.[0]?.definition ?? 'No definition found';
      setDefinition(def);
    } catch (e) {
      console.error(e);
      setDefinition('');
      setError('Word not found or API error');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Word of the Day</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter a word"
        value={word}
        onChangeText={setWord}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Button title="Search" onPress={fetchData} />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <ScrollView style={styles.result}>
        <Text style={styles.definition}>{definition}</Text>
      </ScrollView>
    </View>
  );
};

export default WordOftheDay;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20, justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: {
    borderWidth: 1, borderColor: '#ccc', padding: 10, width: '100%',
    marginBottom: 10, borderRadius: 5,
  },
  result: { marginTop: 20, width: '100%' },
  definition: { fontSize: 18 },
  error: { color: 'red', marginTop: 10 },
});
