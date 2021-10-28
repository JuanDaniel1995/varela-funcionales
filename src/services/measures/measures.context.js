import React, { useState, useContext, createContext } from "react";
import firestore from '@react-native-firebase/firestore';

import { AuthenticationContext } from "../authentication/authentication.context";

export const MeasuresContext = createContext();

export const MeasuresContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [toBeMeasuredSuggestions, setToBeMeasuredSuggestions] = useState([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [isLoadingMeasures, setIsLoadingMeasures] = useState(false);
  const [isLoadingToBeMeasuredSuggestions, setIsLoadingToBeMeasuredSuggestions] = useState(false);
  const [isSavingUserMeasures, setIsSavingUserMeasures] = useState(false);
  const { currentUser } = useContext(AuthenticationContext);

  const retrieveUsers = async () => {
    setIsLoadingUsers(true);
    try {
      let usersData = []
      let usersDocument = null;
      if (currentUser.isAdmin) {
        usersDocument = await firestore().collection('users').get();
        usersDocument.forEach((doc) => {
          usersData = [...usersData, { uid: doc.id, ...doc.data() }];
        });
        setUsers(usersData);
      } else {
        usersDocument = await firestore().collection('users').doc(currentUser.uid).get();
        setUsers([{ uid: usersDocument.id, ...usersDocument.data() }]);
      }
    } catch (e) {
      console.log(`retrieveUsers error ${e}`);
    } finally {
      setIsLoadingUsers(false);
    }
  }

  const retrieveUserMeasures = async (uid, period) => {
    setIsLoadingMeasures(true);
    try {
      let measuresData = [...measures]
      const measuresSnapshot = await firestore()
        .collection('measures')
        .where('uid', '==', uid)
        .where('period', '==', period)
        .get();
      measuresSnapshot.forEach((doc) => {
        measuresData = [...measuresData, { id: doc.id, ...doc.data() }];
      });
      setMeasures(measuresData);
    } catch (e) {
      console.log(`retrieveUserMeasures error ${e}`);
    } finally {
      setIsLoadingMeasures(false);
    }
  }

  const clearMeasures = () => {
    setMeasures([]);
  }

  const saveUserMeasure = async (uid, period, toBeMeasured, measure) => {
    const measureData = { uid, period, toBeMeasured, measure };
    setIsSavingUserMeasures(true);
    try {
      const savedMeasure = await firestore()
        .collection('measures')
        .add(measureData);
      setMeasures([...measures, { id: savedMeasure.id, ...measureData }])
    } catch (e) {
      console.log(`saveUserMeasure error ${e}`);
    } finally {
      setIsSavingUserMeasures(false);
    }
  }

  const retrieveToBeMeasuredSuggestions = async () => {
    setIsLoadingToBeMeasuredSuggestions(true);
    try {
      let suggestions = []
      const suggestionsSnapshot = await firestore().collection('toBeMeasuredSuggestions').get();
      suggestionsSnapshot.forEach((doc) => {
        suggestions = [...suggestions, { id: doc.id, ...doc.data() }];
      });
      setToBeMeasuredSuggestions(suggestions);
    } catch (e) {
      console.log(`retrieveToBeMeasuredSuggestions error ${e}`);
    } finally {
      setIsLoadingToBeMeasuredSuggestions(false);
    }
  }

  const saveToBeMeasuredSuggestions = async (toBeMeasuredSuggestion) => {
    try {
      await firestore()
        .collection('toBeMeasuredSuggestions')
        .add({
          suggestion: toBeMeasuredSuggestion
        });
    } catch (e) {
      console.log(`saveToBeMeasuredSuggestions error ${e}`);
    }
  }

  return (
    <MeasuresContext.Provider
      value={{
        users,
        measures,
        toBeMeasuredSuggestions,
        isLoadingUsers,
        isLoadingMeasures,
        isLoadingToBeMeasuredSuggestions,
        isSavingUserMeasures,
        retrieveUsers,
        retrieveUserMeasures,
        retrieveToBeMeasuredSuggestions,
        saveToBeMeasuredSuggestions,
        saveUserMeasure,
        clearMeasures,
      }}
    >
      {children}
    </MeasuresContext.Provider>
  );
}