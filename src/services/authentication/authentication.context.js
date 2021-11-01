import React, { useState, useEffect, createContext } from "react";
import {
  GoogleSignin,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);

  const saveUserInfo = async (user) => {
    try {
      let userExtraInfo = { isAdmin: false };
      const userDocument = await firestore().collection('users').doc(user.uid).get();
      if (!userDocument.exists) {
        await firestore()
          .collection('users')
          .doc(user.uid)
          .set({
            displayName: user.displayName,
            email: user.email,
            ...userExtraInfo,
          });
        user = { ...userExtraInfo, ...user };
      } else {
        const { isAdmin } = userDocument.data();
        user = { isAdmin, ...user };
      }
      setCurrentUser(user);
    } catch (e) {
      setError(e.toString());
    } finally {
      setIsLoading(false);
    }
  }

  const onAuthStateChanged = (user) => {
    if (user) {
      const { displayName, email, photoURL, uid, emailVerified } = user;
      if (emailVerified) saveUserInfo({ displayName, email, photoURL, uid });
      else {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
      setCurrentUser(null);
      setError(null);
    }
  }

  const clearError = () => {
    setError(null);
  }

  const clearNotification = () => {
    setNotification(null);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  const onLogin = async (email, password) => {
    setIsLoading(true);
    try {
      await auth().signInWithEmailAndPassword(email, password);
    } catch (e) {
      setError(e.toString());
    } finally {
      setIsLoading(false);
    }
  };

  const onGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
    } catch (e) {
      setError(e.toString());
      setIsLoading(false);
    }
  }

  const onRegister = async (email, password, displayName, repeatedPassword) => {
    clearNotification();
    if (password !== repeatedPassword) {
      setError("Error: Las contraseñas no coinciden");
      return;
    }
    setIsLoading(true);
    try {
      let { user } = await auth().createUserWithEmailAndPassword(email, password);
      await user.reload();
      user = auth().currentUser;
      await user.updateProfile({ displayName });
      await user.sendEmailVerification();
      setNotification('Se ha enviado un correo para verificar tu correo');
    } catch (e) {
      setError(e.toString());
    } finally {
      setIsLoading(false);
    }
  };

  const onLogout = async () => {
    try {
      await auth().signOut();
    } catch (e) {
      setError(e.toString());
    }
  };

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated: !!currentUser,
        currentUser,
        isLoading,
        error,
        notification,
        onLogin,
        onGoogleLogin,
        onRegister,
        onLogout,
        clearError,
        clearNotification,
        setCurrentUser,
        saveUserInfo,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
