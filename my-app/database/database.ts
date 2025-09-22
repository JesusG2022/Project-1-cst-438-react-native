import * as SQLite from 'expo-sqlite'; // Import SQLite module from Expo

// Open a connection to the SQLite database
const dbPromise = SQLite.openDatabaseAsync('databaseName');

// Function to initialize the database
const initializeDatabase = async () => {
  try {
    const db = await dbPromise; // Wait for the database connection to be established

    // Create the User table if it does not already exist
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS Users24 (
        UserId INTEGER PRIMARY KEY AUTOINCREMENT, -- Auto-incrementing primary key
        Username VARCHAR(225) UNIQUE, -- Unique username
        Password VARCHAR(225), 
        Email VARCHAR(255), -- Email address
        Bio VARCHAR(1000) -- User bio
      )
    `);

    // Create the Posts table if it does not already exist
    await db.execAsync(`

      CREATE TABLE IF NOT EXISTS Posts24 (
        PostId INTEGER PRIMARY KEY, -- Primary key for posts
        UserId INTEGER, -- Foreign key referencing Users24 table
        Date DATE, -- Date of the post
        text_quote VARCHAR(10000), -- Content of the post
        FOREIGN KEY (UserId) REFERENCES Users24(UserId) -- Establish relationship with Users24 table
      )
    `);

    // Add Title column if it doesn't exist (for existing databases)
    try {
      await db.execAsync(`ALTER TABLE Posts24 ADD COLUMN Title VARCHAR(255)`);
      console.log('Title column added to Posts24 table');
    } catch (error) {
      // Column might already exist
      console.log('Title column already exists or error adding it:', error);
    }


    const users = [
      { Username: 'jesus', Password: 'password1', Email: 'jesus@example.com', Bio: 'Bio for Jesus' },
      { Username: 'roy', Password: 'password2', Email: 'roy@example.com', Bio: 'Bio for Roy' },
      { Username: 'justin', Password: 'password3', Email: 'justin@example.com', Bio: 'Bio for Justin' },
      { Username: 'shannyn', Password: 'password4', Email: 'shannyn@example.com', Bio: 'Bio for Shannyn' }
    ];

    for (const user of users) {
      try {
        // Insert each user into the Users24 table
        await db.runAsync(
          `INSERT INTO Users24 (Username, Password, Email, Bio) VALUES (?, ?, ?, ?)`,
          [user.Username, user.Password, user.Email, user.Bio]
        );
      } catch (error) {
        console.error('Error inserting user:', user, error); // Log any errors during insertion
      }
    }

    // Check if posts already exist
    try {
      const postCount = await db.getFirstAsync<{ count: number }>('SELECT COUNT(*) as count FROM Posts24');
      
      if (postCount && postCount.count > 0) {
        console.log('Posts already exist, skip sample data insertion');
      } else {
        // Insert predefined posts into the Posts24 table
        const posts = [
          { UserId: 1, Date: '2025-09-05', Title: 'Jesus\' First Post', text_quote: 'This is a post by Jesus.' },
          { UserId: 1, Date: '2025-09-06', Title: 'Jesus\' Second Post', text_quote: 'This is another post by Jesus.' },
          { UserId: 1, Date: '2025-09-07', Title: 'Jesus\' Third Post', text_quote: 'This is yet another post by Jesus.' },
          { UserId: 1, Date: '2025-09-08', Title: 'Jesus\' Fourth Post', text_quote: 'This is the fourth post by Jesus.' },
          { UserId: 2, Date: '2025-09-05', Title: 'Roy\'s First Post', text_quote: 'This is a post by Roy.' },
          { UserId: 3, Date: '2025-09-05', Title: 'Justin\'s First Post', text_quote: 'This is a post by Justin.' },
          { UserId: 4, Date: '2025-09-05', Title: 'Shannyn\'s First Post', text_quote: 'This is a post by Shannyn.' }
        ];

        // Insert sample posts using INSERT OR IGNORE to prevent duplicates
        for (const post of posts) {
          await db.runAsync(
            `INSERT OR IGNORE INTO Posts24 (UserId, Date, Title, text_quote) VALUES (?, ?, ?, ?)`,
            [post.UserId, post.Date, post.Title, post.text_quote]
          );
        }
        console.log('Sample posts inserted successfully');

      }
    } catch (error) {
      console.error('Error handling posts:', error);
    }
  } catch (error) {
    console.error('Error initializing database:', error); // Log any errors during database initialization
  }
};

// Function to add a new user to the Users24 table
export const addUser = async (username: string, password: string, email: string, bio: string) => {
  try {
    const db = await dbPromise; // Wait for the database connection to be established
    await db.runAsync(
      `INSERT INTO Users24 (Username, Password, Email, Bio) VALUES (?, ?, ?, ?)`,
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
    const result = await db.getAllAsync('SELECT Username, Bio FROM Users24');
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
    const user = await db.getFirstAsync<{ UserId: number }>('SELECT UserId FROM Users24 WHERE Username = ?', [username]);
    if (!user || typeof user.UserId !== 'number') return [];
    // Get posts for that user
    const posts = await db.getAllAsync(
      'SELECT PostId, Date, Title, text_quote FROM Posts24 WHERE UserId = ? ORDER BY Date DESC, PostId DESC', // order posts by date then post id
      [user.UserId]
    );
    return posts; // Array of { PostId, Date, Title, text_quote }
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
};

// Function to add a new post (poem)
export const addPost = async (userId: number, title: string, content: string) => {
  try {
    const db = await dbPromise;
    // Get current date in PST timezone specifically
    const now = new Date();
    const pstDate = new Date(now.toLocaleString("en-US", { timeZone: "America/Los_Angeles" }));
    const currentDate = `${pstDate.getFullYear()}-${String(pstDate.getMonth() + 1).padStart(2, '0')}-${String(pstDate.getDate()).padStart(2, '0')}`;
    
    const result = await db.runAsync(
      `INSERT INTO Posts24 (UserId, Date, Title, text_quote) VALUES (?, ?, ?, ?)`,
      [userId, currentDate, title, content]
    );
    return result;
  } catch (error) {
    console.error('Error adding post:', error);
    throw error;
  }
};

// Function to get all posts for a user
export const getPostsByUserId = async (userId: number) => {
  try {
    const db = await dbPromise;
    const posts = await db.getAllAsync(
      'SELECT PostId, Date, Title, text_quote FROM Posts24 WHERE UserId = ? ORDER BY Date DESC, PostId DESC',
      [userId]
    );
    return posts; // Array of { PostId, Date, Title, text_quote }
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
};

export const searchPosts = async (query: string) => {
  try {
    const db = await dbPromise;
    const posts = await db.getAllAsync(
      `SELECT Date, text_quote FROM Posts24 WHERE text_quote LIKE ?`,
      [`%${query}%`] // Use % for wildcard matching
    );
    return posts; // Array of { Date, text_quote }
  } catch (error) {
    console.error('Error searching posts:', error);
    return [];
  }
};

// Function to update a post
export const updatePost = async (postId: number, title: string, content: string) => {
  try {
    const db = await dbPromise;
    await db.runAsync(
      `UPDATE Posts24 SET Title = ?, text_quote = ? WHERE PostId = ?`,
      [title, content, postId]
    );
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
};

// Function to delete a post
export const deletePost = async (postId: number) => {
  try {
    const db = await dbPromise;
    const result = await db.runAsync('DELETE FROM Posts24 WHERE PostId = ?', [postId]);
    return result;
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
};

// Function to get user ID by username
export const getUserIdByUsername = async (username: string) => {
  try {
    const db = await dbPromise;
    const user = await db.getFirstAsync<{ UserId: number }>('SELECT UserId FROM Users24 WHERE Username = ?', [username]);
    return user ? user.UserId : null;
  } catch (error) {
    console.error('Error getting user ID:', error);
    return null;
  }
};

// Function to get all posts filtered by day, most recent first
export const getAllPostsByDay = async () => {
  try {
    const db = await dbPromise;
    const posts = await db.getAllAsync(`
      SELECT p.PostId, p.UserId, p.Date, p.Title, p.text_quote, u.Username 
      FROM Posts24 p 
      JOIN Users24 u ON p.UserId = u.UserId 
      ORDER BY p.Date DESC, p.PostId DESC
    `);
    return posts; // Array of { PostId, UserId, Date, Title, text_quote, Username }
  } catch (error) {
    console.error('Error fetching all posts by day:', error);
    return [];
  }
};


// Function to update user details
export const updateUserDetails = async (userId: number, email: string, bio: string) => {
  try {
    const db = await dbPromise;
    const updates = [];
    const params: (string | number)[] = [];


    if (email.trim()) {
      updates.push('Email = ?');
      params.push(email);
    }
    if (bio.trim()) {
      updates.push('Bio = ?');
      params.push(bio);
    }

    if (updates.length > 0) {
      params.push(userId);
      await db.runAsync(`UPDATE Users24 SET ${updates.join(', ')} WHERE UserId = ?`, params);
    }
  } catch (error) {
    console.error('Error updating user details:', error);
    throw error;
  }
};

export const updateUserDetails2 = async (userId: number, email: string, bio: string, password?: string) => {
  try {
    const db = await dbPromise;
    const updates = [];
    const params: (string | number)[] = [];

    if (email.trim()) {
      updates.push('Email = ?');
      params.push(email);
    }
    if (bio.trim()) {
      updates.push('Bio = ?');
      params.push(bio);
    }
    if (password && password.trim()) {
      updates.push('Password = ?');
      params.push(password);
    }

    if (updates.length > 0) {
      params.push(userId);
      await db.runAsync(`UPDATE Users24 SET ${updates.join(', ')} WHERE UserId = ?`, params);
    }
  } catch (error) {
    console.error('Error updating user details:', error);
    throw error;
  }
};

export const getUserPasswordById = async (userId: number) => {
  try {
    const db = await dbPromise;
    const user = await db.getFirstAsync<{ Password: string }>(
      'SELECT Password FROM Users24 WHERE UserId = ?',
      [userId]
    );
    return user ? user.Password : null;
  } catch (error) {
    console.error('Error fetching user password:', error);
    throw error;
  }
};
// Call the function to initialize the database when the module is loaded
initializeDatabase();