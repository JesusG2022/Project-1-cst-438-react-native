import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Start from './pages/Start';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Page1 from './pages/page1';
import Page2 from './pages/page2';
import Dictionary from './pages/WordOftheDay';
import WordOftheDay from './pages/WordOftheDay';

import * as SQLite from 'expo-sqlite';

const dbPromise = SQLite.openDatabaseAsync('databaseName');

dbPromise.then(async (db) => {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS USER (
      UserId INTEGER PRIMARY KEY AUTOINCREMENT,
      Username VARCHAR(225) UNIQUE,
      Password VARCHAR(225) UNIQUE,
      Email VARCHAR(255),
      bio VARCHAR(255),
    );

    CREATE TABLE IF NOT EXISTS POSTS (
      PostId INTEGER PRIMARY KEY,
      UserId INTEGER,
      Date DATE,
      text_quote VARCHAR(1000),
      FOREIGN KEY (UserId) REFERENCES USER(UserId)
    );

    INSERT INTO USER (Username, Password, Email, bio) VALUES ('Jesus', 'pass1', 'jesus@example.com', 'Bio of Jesus');
    INSERT INTO USER (Username, Password, Email, bio) VALUES ('Roy', 'pass2', 'roy@example.com', 'Bio of Roy');
    INSERT INTO USER (Username, Password, Email, bio) VALUES ('Justin', 'pass3', 'justin@example.com', 'Bio of Justin');
    INSERT INTO USER (Username, Password, Email, bio) VALUES ('Shannyn', 'pass4', 'shannyn@example.com', 'Bio of Shannyn');

    INSERT INTO POSTS (PostId, UserId, Date, text_quote) VALUES (1, 1, '2023-10-01', 'This is Jesus first post!');
    INSERT INTO POSTS (PostId, UserId, Date, text_quote) VALUES (2, 2, '2023-10-02', 'Roy shares an inspiring quote.');
    INSERT INTO POSTS (PostId, UserId, Date, text_quote) VALUES (3, 3, '2023-10-03', 'Justin writes about his day.');
    INSERT INTO POSTS (PostId, UserId, Date, text_quote) VALUES (4, 4, '2023-10-04', 'Shannyn posts a motivational message.');
  `);

  // Query and log data from USER table
  const users = await db.execAsync('SELECT * FROM USER');
  console.log('Users:', users);

  // Query and log data from POSTS table
  const posts = await db.execAsync('SELECT * FROM POSTS');
  console.log('Posts:', posts);
});

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Page1" component={Page1} />
        <Stack.Screen name="Page2" component={Page2} />
        <Stack.Screen name="WordOftheDay" component={WordOftheDay} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
};
