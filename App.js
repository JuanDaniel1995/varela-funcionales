import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { ThemeProvider } from "styled-components/native";
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";

import { theme } from "./src/infrastructure/theme";
import { Navigation } from "./src/infrastructure/navigation";

import { AuthenticationContextProvider } from "./src/services/authentication/authentication.context";

export default function App() {
  useOswald({ Oswald_400Regular });

  useLato({ Lato_400Regular });


  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '823573541332-6dgj627aruepasol7nin9dd2imgmnr5e.apps.googleusercontent.com',
    });
  }, [])

  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthenticationContextProvider>
          <Navigation />
        </AuthenticationContextProvider>
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}
