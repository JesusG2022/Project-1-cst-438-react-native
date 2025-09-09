import * as SQLite from 'expo-sqlite'; // Import SQLite module from Expo

// Open a connection to the SQLite database
const dbPromise = SQLite.openDatabaseAsync('databaseName');

// Function to initialize the database
const initializeDatabase = async () => {
  try {
    const db = await dbPromise; // Wait for the database connection to be established

    // Create the User table if it does not already exist
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS User15 (
        UserId INTEGER PRIMARY KEY AUTOINCREMENT, -- Auto-incrementing primary key
        Username VARCHAR(225) UNIQUE, -- Unique username
        Password VARCHAR(225) UNIQUE, -- Unique password
        Email VARCHAR(255), -- Email address
        Bio VARCHAR(1000) -- User bio
      )
    `);

    // Create the Posts table if it does not already exist
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS Posts15 (
        PostId INTEGER PRIMARY KEY, -- Primary key for posts
        UserId INTEGER, -- Foreign key referencing User15 table
        Date DATE, -- Date of the post
        text_quote VARCHAR(1000), -- Content of the post
        FOREIGN KEY (UserId) REFERENCES User15(UserId) -- Establish relationship with User15 table
      )
    `);

    // Insert predefined users into the User15 table
    const users = [
      { Username: 'jesus', Password: 'password1', Email: 'jesus@example.com', Bio: 'Bio for Jesus' },
      { Username: 'roy', Password: 'password2', Email: 'roy@example.com', Bio: 'Bio for Roy' },
      { Username: 'justin', Password: 'password3', Email: 'justin@example.com', Bio: 'Bio for Justin' },
      { Username: 'shannyn', Password: 'password4', Email: 'shannyn@example.com', Bio: 'Bio for Shannyn' }
    ];

    for (const user of users) {
      try {
        // Insert each user into the User15 table
        await db.runAsync(
          `INSERT INTO User15 (Username, Password, Email, Bio) VALUES (?, ?, ?, ?)`,
          [user.Username, user.Password, user.Email, user.Bio]
        );
      } catch (error) {
        console.error('Error inserting user:', user, error); // Log any errors during insertion
      }
    }

    // Insert predefined posts into the Posts15 table
    const posts = [
      { UserId: 1, Date: '2025-09-05', text_quote: 'This is a post by Jesus.' },
      { UserId: 2, Date: '2025-09-05', text_quote: 'This is a post by Roy.' },
      { UserId: 3, Date: '2025-09-05', text_quote: 'This is a post by Justin.' },
      { UserId: 4, Date: '2025-09-05', text_quote: 'This is a post by Shannyn.' }
    ];

    for (const post of posts) {
      try {
        // Insert each post into the Posts15 table
        await db.runAsync(
          `INSERT INTO Posts15 (UserId, Date, text_quote) VALUES (?, ?, ?)`,
          [post.UserId, post.Date, post.text_quote]
        );
      } catch (error) {
        console.error('Error inserting post:', post, error); // Log any errors during insertion
      }
    }
  } catch (error) {
    console.error('Error initializing database:', error); // Log any errors during database initialization
  }
};

// Function to add a new user to the User15 table
export const addUser = async (username: string, password: string, email: string, bio: string) => {
  try {
    const db = await dbPromise; // Wait for the database connection to be established
    await db.runAsync(
      `INSERT INTO User15 (Username, Password, Email, Bio) VALUES (?, ?, ?, ?)`,
      [username, password, email, bio] // Insert user details into the table
    );
    console.log('User added successfully'); // Log success message
  } catch (error) {
    console.error('Error adding user:', error); // Log any errors during user addition
    throw error; // Rethrow the error for further handling
  }
};

// Function to fetch users
export const getAllUsers = async () => {
  try {
    const db = await dbPromise;
    const result = await db.getAllAsync('SELECT Username, Bio FROM User15');
    return result; // Array of { Username, Bio }
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};
// Function to get a post by username
export const getPostsByUsername = async (username: string) => {
  try {
    const db = await dbPromise;
    // Get the user's ID
    const user = await db.getFirstAsync<{ UserId: number }>('SELECT UserId FROM User15 WHERE Username = ?', [username]);
    if (!user || typeof user.UserId !== 'number') return [];
    // Get posts for that user
    const posts = await db.getAllAsync(
      'SELECT Date, text_quote FROM Posts15 WHERE UserId = ?',
      [user.UserId]
    );
    return posts; // Array of { Date, text_quote }
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
};

// Call the function to initialize the database when the module is loaded
initializeDatabase();