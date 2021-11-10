import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { ThemeProvider } from "styled-components/native";
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import { theme } from "./src/infrastructure/theme";
import { Navigation } from "./src/infrastructure/navigation";

import { AuthenticationContextProvider } from "./src/services/authentication/authentication.context";

import { colors } from "./src/infrastructure/theme/colors"
import { themeFonts } from "./src/infrastructure/theme/fonts"

const paperTheme = {
  ...DefaultTheme,
  roundness: 2,
  colors: colors.brand,
  fonts: themeFonts
};

export default function App() {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: 'WEB_CLIENT_ID',
    });
  }, [])

  return (
    <>
      <PaperProvider theme={paperTheme}>
        <ThemeProvider theme={theme}>
          <AuthenticationContextProvider>
            <Navigation />
          </AuthenticationContextProvider>
        </ThemeProvider>
        <ExpoStatusBar style="auto" />
      </PaperProvider>
    </>
  );
}
