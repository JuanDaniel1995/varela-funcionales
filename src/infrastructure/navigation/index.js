import React, { useRef, useEffect, useState, useContext } from "react";
import { AppState } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import auth from '@react-native-firebase/auth';

import { AppNavigator } from "./app.navigator";
import { AccountNavigator } from "./account.navigator";

import { AuthenticationContext } from "../../services/authentication/authentication.context";

export const Navigation = () => {
  const { isAuthenticated } = useContext(AuthenticationContext);

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppNavigator /> : <AccountNavigator />}
    </NavigationContainer>
  );
};
