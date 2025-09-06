// pages/WordOftheDay.tsx
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Title from '../components/Title';
import Navbar from '../components/Navbar';

const WordOftheDay: React.FC = () => {
  const [wordOfTheDay, setWordOfTheDay] = useState('');
  const [wordOfTheDayDefinition, setWordOfTheDayDefinition] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const getPSTDate = () => {
    const now = new Date();
    return new Date(now.toLocaleString("en-US", { timeZone: "America/Los_Angeles" }));
  };

  const getTodayString = () => {
    const pstDate = getPSTDate();
    return pstDate.toISOString().split('T')[0];
  };

  const formatDateForDisplay = () => {
    const pstDate = getPSTDate();
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const day = pstDate.getDate();
    const month = months[pstDate.getMonth()];
    const year = pstDate.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  const getRandomWord = async () => {
    try {
      const response = await fetch('https://random-word-api.vercel.app/api?words=1');
      const data = await response.json();
      return data[0];
    } catch (error) {
      console.error('Error getting random word:', error);
      return 'serendipity';
    }
  };

  const initializeWordOfTheDay = async () => {
    try {
      const today = getTodayString();
      const storedDate = await AsyncStorage.getItem('wordOfTheDayDate');
      const storedWord = await AsyncStorage.getItem('wordOfTheDay');

      if (storedDate !== today || !storedWord) {
        const newWord = await getRandomWord();
        await AsyncStorage.setItem('wordOfTheDay', newWord);
        await AsyncStorage.setItem('wordOfTheDayDate', today);
        setWordOfTheDay(newWord);
      } else {
        setWordOfTheDay(storedWord);
      }
    } catch (error) {
      console.error('Error initializing word of the day:', error);
      setWordOfTheDay('serendipity');
    }
  };

  const fetchWordOfTheDayDefinition = async (wordToDefine: string) => {
    try {
      setWordOfTheDayDefinition('Loading...');
      const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${wordToDefine.toLowerCase().trim()}`);
      if (!res.ok) throw new Error('Could not fetch resource');
      const data = await res.json();
      const def = data?.[0]?.meanings?.[0]?.definitions?.[0]?.definition ?? 'No definition found';
      setWordOfTheDayDefinition(def);
    } catch (e) {
      console.error(e);
      setWordOfTheDayDefinition('Definition not available');
    }
  };

  useEffect(() => {
    const initialize = async () => {
      await initializeWordOfTheDay();
      setIsLoading(false);
    };
    initialize();
  }, []);

  useEffect(() => {
    if (wordOfTheDay) {
      fetchWordOfTheDayDefinition(wordOfTheDay);
    }
  }, [wordOfTheDay]);

  return (
    <View style={styles.container}>
      <Title />
      <Navbar />
      <Text style={styles.title}>Word of the Day</Text>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loading}>Loading today's word...</Text>
        </View>
      ) : (
        <View style={styles.wordOfTheDayContainer}>
          <Text style={styles.date}>{formatDateForDisplay()}</Text>
          <Text style={styles.wordOfTheDay}>{wordOfTheDay}</Text>
          <View style={styles.definitionContainer}>
            <Text style={styles.definitionLabel}>Definition:</Text>
            <ScrollView style={styles.definitionScroll}>
              <Text style={styles.definition}>{wordOfTheDayDefinition}</Text>
            </ScrollView>
          </View>
        </View>
      )}
    </View>
  );
};

export default WordOftheDay;

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff', 
    padding: 20, 
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    marginBottom: 20, 
    textAlign: 'center',
    color: '#2c3e50'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loading: {
    fontSize: 18,
    textAlign: 'center',
    color: '#7f8c8d'
  },
  wordOfTheDayContainer: {
    backgroundColor: '#f8f9fa',
    padding: 25,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  date: {
    fontSize: 16,
    color: '#6c757d',
    marginBottom: 20,
    fontStyle: 'italic'
  },
  wordOfTheDay: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#e74c3c',
    textAlign: 'center',
    marginBottom: 25,
    textTransform: 'capitalize',
    letterSpacing: 1
  },
  definitionContainer: {
    width: '100%',
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#e74c3c'
  },
  definitionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#495057',
    marginBottom: 10,
    textAlign: 'center'
  },
  definitionScroll: {
    maxHeight: 150
  },
  definition: { 
    fontSize: 18,
    lineHeight: 26,
    color: '#2c3e50',
    textAlign: 'center'
  }
});