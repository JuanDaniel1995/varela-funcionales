import React, { useState, useEffect, createContext } from "react";
import {
  GoogleSignin,
} from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
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
      const { displayName, email, photoURL, uid, emailVerified, providerData } = user;
      const providerId = providerData[0]?.providerId;
      const isInternalLogin = providerId === 'password';
      if (emailVerified || !isInternalLogin) saveUserInfo({ displayName, email, photoURL, uid });
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
      let { user } = await auth().signInWithEmailAndPassword(email, password);
      await user.reload();
      user = auth().currentUser;
      if (!user.emailVerified) await onLogout();
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

  const onFacebookLogin = async () => {
    setIsLoading(true);
    try {
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
      if (result.isCancelled) {
        throw 'User cancelled the login process';
      }
      const data = await AccessToken.getCurrentAccessToken();
      const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
      await auth().signInWithCredential(facebookCredential);
    } catch (e) {
      setError(e.toString());
      setIsLoading(false);
    }
  }

  const onRegister = async (email, password, displayName, repeatedPassword, postRegister = null) => {
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
      await onLogout();
      setNotification('Se ha enviado un correo para verificar tu correo');
      if (postRegister) postRegister();
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
        onFacebookLogin,
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
