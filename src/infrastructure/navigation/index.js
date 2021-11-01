import React, { useRef, useEffect, useState, useContext } from "react";
import { AppState } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import auth from '@react-native-firebase/auth';

import { AppNavigator } from "./app.navigator";
import { AccountNavigator } from "./account.navigator";

import { AuthenticationContext } from "../../services/authentication/authentication.context";

export const Navigation = () => {
  const { saveUserInfo, currentUser, setCurrentUser, isAuthenticated } = useContext(AuthenticationContext);
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", nextAppState => {
      if (appState.current.match(/inactive|background/) && nextAppState === "active") {
        const firebaseUser = auth().currentUser;
        if (firebaseUser?.emailVerified && !currentUser) {
          const { displayName, email, photoURL, uid } = firebaseUser;
          const user = { displayName, email, photoURL, uid };
          setCurrentUser(user);
          saveUserInfo(user);
        }
      }
      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    });

    return () => {
      subscription?.remove();
    };
  }, []);

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppNavigator /> : <AccountNavigator />}
    </NavigationContainer>
  );
};
