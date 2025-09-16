import * as SQLite from 'expo-sqlite';

const dbPromise = SQLite.openDatabaseAsync('databaseName');

describe('Database Tests', () => {
  beforeAll(async () => {
    const db = await dbPromise;
    // Ensure the database is initialized before running tests
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS Users1 (
        UserId INTEGER PRIMARY KEY AUTOINCREMENT,
        Username VARCHAR(225) UNIQUE,
        Password VARCHAR(225) UNIQUE,
        Email VARCHAR(255),
        Bio VARCHAR(225)
      )
    `);

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS Posts1 (
        PostId INTEGER PRIMARY KEY,
        UserId INTEGER,
        Date DATE,
        text_quote VARCHAR(10000),
        FOREIGN KEY (UserId) REFERENCES User(UserId)
      )
    `);

    // Insert test data
    await db.execAsync(`DELETE FROM Users1`);
    await db.execAsync(`DELETE FROM Posts1`);

    const users = [
      { Username: 'jesus', Password: 'password1', Email: 'jesus@example.com', Bio: 'Bio for Jesus' },
      { Username: 'roy', Password: 'password2', Email: 'roy@example.com', Bio: 'Bio for Roy' },
    ];

    for (const user of users) {
      await db.runAsync(
        `INSERT INTO User (Username, Password, Email, Bio) VALUES (?, ?, ?, ?)`,
        [user.Username, user.Password, user.Email, user.Bio]
      );
    }

    const posts = [
      { UserId: 2, Date: '2025-09-05', text_quote: 'This is a post by Roy.' },
    ];

    for (const post of posts) {
      await db.runAsync(
        `INSERT INTO Posts (UserId, Date, text_quote) VALUES (?, ?, ?)`,
        [post.UserId, post.Date, post.text_quote]
      );
    }
  });
  
  });

test('Should get correct UserId for "jesus"', async () => {
  const db = await dbPromise;

  const resultSet = await db.getAllAsync<{ UserId: number }>(
    `SELECT UserId FROM User WHERE Username = 'jesus'`
  );

  // getAllAsync returns an array of rows
  const userId = resultSet[0]?.UserId;
  expect(userId).toBe(1);
});
;