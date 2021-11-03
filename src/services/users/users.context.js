import React, { useState, createContext } from "react";
import firestore from '@react-native-firebase/firestore';

export const UsersContext = createContext();

export const UsersContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);

  const retrieveUsers = async () => {
    setIsLoading(true);
    try {
      let usersData = []
      let usersDocument = null;
      usersDocument = await firestore().collection('users').get();
      usersDocument.forEach((doc) => {
        usersData = [...usersData, { uid: doc.id, ...doc.data() }];
      });
      setUsers(usersData);
    } catch (e) {
      console.log(`retrieveUsers error ${e}`);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <UsersContext.Provider
      value={{
        users,
        isLoading,
        retrieveUsers,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
}