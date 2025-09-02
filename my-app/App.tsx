import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Start from './pages/Start';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Page1 from './pages/page1';
import Page2 from './pages/page2';
import * as SQLite from 'expo-sqlite';

let dbPromise = SQLite.openDatabaseAsync('mydatabase.db');

dbPromise.then(async (db) => {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS users (
      User_id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      password TEXT NOT NULL
    );
  `);
});

dbPromise.then(async (db) => {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS poem (
      Poem_id INTEGER PRIMARY KEY AUTOINCREMENT,
      User_id INTEGER NOT NULL,
      content TEXT NOT NULL,
      FOREIGN KEY (User_id) REFERENCES users (User_id)
    );
  `);
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