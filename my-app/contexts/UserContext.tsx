import React, { createContext, useContext, useState, ReactNode } from 'react';

// User interface to define the structure of user data
interface User {
  userId: number;
  username: string;
}

// UserContextType interface to define the context API structure
interface UserContextType {
  currentUser: User | null; // Current logged-in user (null if not logged in)
  setCurrentUser: (user: User | null) => void; // Function to set current user
  login: (username: string) => Promise<void>; // Function to log in a user
  logout: () => void; // Function to log out current user
}

// Create the UserContext with undefined as default value
const UserContext = createContext<UserContextType | undefined>(undefined);

// Custom hook to use the UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

// Props interface for UserProvider component
interface UserProviderProps {
  children: ReactNode;
}

// UserProvider component that wraps the app and provides user context
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  // State to track the current logged-in user
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Login function that maps usernames to user IDs and sets current user
  const login = async (username: string) => {
    const userMap: { [key: string]: number } = {
      'jesus': 1,
      'roy': 2,
      'justin': 3,
      'shannyn': 4
    };
    
    const userId = userMap[username.toLowerCase()];
    if (userId) {
      // Set the current user in context
      setCurrentUser({ userId, username });
    } else {
      throw new Error('User not found');
    }
  };

  // Logout function that clears the current user
  const logout = () => {
    setCurrentUser(null);
  };

  // Value object containing all context functions and state
  const value = {
    currentUser,
    setCurrentUser,
    login,
    logout
  };

  // Return the UserContext.Provider with the value and children 
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
