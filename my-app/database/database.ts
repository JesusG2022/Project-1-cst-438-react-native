import * as SQLite from 'expo-sqlite';

const dbPromise = SQLite.openDatabaseAsync('databaseName');

// Function to initialize the database
const initializeDatabase = async () => {
  try {
    const db = await dbPromise;

    // Create the User table
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS User (
        UserId INTEGER PRIMARY KEY AUTOINCREMENT,
        Username VARCHAR(225) UNIQUE,
        Password VARCHAR(225) UNIQUE,
        Email VARCHAR(255),
        Bio VARCHAR(225)
      )
    `);

    // Create the Posts table
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS Posts (
        PostId INTEGER PRIMARY KEY,
        UserId INTEGER,
        Date DATE,
        text_quote VARCHAR(1000),
        FOREIGN KEY (UserId) REFERENCES User(UserId)
      )
    `);

    // Insert users
    const users = [
      { Username: 'jesus', Password: 'password1', Email: 'jesus@example.com', Bio: 'Bio for Jesus' },
      { Username: 'roy', Password: 'password2', Email: 'roy@example.com', Bio: 'Bio for Roy' },
    ];

    for (const user of users) {
      try {
        await db.runAsync(
          `INSERT INTO User (Username, Password, Email, Bio) VALUES (?, ?, ?, ?)`,
          [user.Username, user.Password, user.Email, user.Bio]
        );
      } catch (error) {
        console.error('Error inserting user:', user, error);
      }
    }

    // Insert posts
    const posts = [
      { UserId: 1, Date: '2025-09-05', text_quote: 'This is a post by Jesus.' },
      { UserId: 2, Date: '2025-09-05', text_quote: 'This is a post by Roy.' },
    ];

    for (const post of posts) {
      try {
        await db.runAsync(
          `INSERT INTO Posts (UserId, Date, text_quote) VALUES (?, ?, ?)`,
          [post.UserId, post.Date, post.text_quote]
        );
      } catch (error) {
        console.error('Error inserting post:', post, error);
      }
    }
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};




// Call the function to initialize the database
initializeDatabase();