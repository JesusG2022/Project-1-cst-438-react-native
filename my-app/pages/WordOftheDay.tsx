// pages/WordOftheDay.tsx
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Title from '../components/Title';
import Navbar from '../components/Navbar';

// useState tool used to create state variables - information the component needs to remember

const WordOftheDay: React.FC = () => {
  const [wordOfTheDay, setWordOfTheDay] = useState('');
  const [wordDetails, setWordDetails] = useState<any | null>(null);  // Park - Added this and removed the wordOftheDayDefinition state 
  // const [wordOfTheDayDefinition, setWordOfTheDayDefinition] = useState('');
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

  // const fetchWordOfTheDayDefinition = async (wordToDefine: string) => {
  //   try {
  //     setWordOfTheDayDefinition('Loading...');
  //     const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${wordToDefine.toLowerCase().trim()}`);
  //     if (!res.ok) throw new Error('Could not fetch resource');
  //     const data = await res.json();
  //     const def = data?.[0]?.meanings?.[0]?.definitions?.[0]?.definition ?? 'No definition found';
  //     setWordOfTheDayDefinition(def);
  //   } catch (e) {
  //     console.error(e);
  //     setWordOfTheDayDefinition('Definition not available');
  //   }
  // };

  const fetchWordDetails = async (wordToDefine: string) => {
    try {
      const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${wordToDefine.toLowerCase().trim()}`);
      if (!res.ok) throw new Error('Could not fetch resource');
            const data = await res.json();

      // Put the details into an object
      setWordDetails(data[0]);
    } catch (e) {
      console.error(e);
      setWordDetails(null); // sets to null if error
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
      fetchWordDetails(wordOfTheDay); // changed to fetchWordDetails instead of fetchWordOfTheDayDefinition
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
          <ScrollView style={styles.detailsScroll}>
            {wordDetails && wordDetails.meanings.map((meaning: any, index: number) => (
              <View key={index} style={styles.meaningContainer}>
                <Text style={styles.partOfSpeech}>{meaning.partOfSpeech}</Text>
                {meaning.definitions.map((def: any, defIndex: number) => (
                  <View key={defIndex} style={styles.definitionBlock}>
                    <Text style={styles.definition}>- {def.definition}</Text>
                    {def.example && (
                      <Text style={styles.example}>Example: "{def.example}"</Text>
                    )}
                    {def.synonyms && def.synonyms.length > 0 && (
                      <Text style={styles.synonyms}>Synonyms: {def.synonyms.join(', ')}</Text>
                    )}
                  </View>
                ))}
              </View>
            ))}
          </ScrollView>
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
 detailsScroll: {
    width: '100%',
    maxHeight: 250, // not sure if this is fine, feel free to change tho
  },
  meaningContainer: {
    width: '100%',
    marginBottom: 20,
  },
  partOfSpeech: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2980b9',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 5,
  },
  definitionBlock: {
    marginBottom: 15,
  },
  definition: {
    fontSize: 16,
    lineHeight: 24,
  },
  example: {
    fontSize: 15,
    fontStyle: 'italic',
    color: '#555',
    marginTop: 5,
  },
  synonyms: {
    fontSize: 15,
    color: '#3498db',
    marginTop: 5,
  }
});