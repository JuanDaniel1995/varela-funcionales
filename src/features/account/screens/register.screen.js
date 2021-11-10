import React, { useState, useContext } from "react";
import { ScrollView } from "react-native";

import { SafeArea } from "../../../components/utility/safe-area.component";
import {
  AccountBackground,
  AccountContainer,
  AuthButton,
  AuthSecondaryButton,
  AuthInput,
  ErrorContainer,
  Title,
} from "../components/account.styles";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";

export const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const { onRegister, isLoading, error, notification, clearError, clearNotification } = useContext(AuthenticationContext);

  const clearInputs = () => {
    setEmail("");
    setDisplayName("");
    setPassword("");
    setRepeatedPassword("");
  }

  return (
    <SafeArea>
      <ScrollView>
        <AccountBackground>
          <Title>Varela funcionales</Title>
          <AccountContainer>
            <Spacer size="large">
              <AuthInput
                label="Correo electrónico"
                value={email}
                textContentType="emailAddress"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={(u) => setEmail(u)}
              />
            </Spacer>
            <Spacer size="large">
              <AuthInput
                label="Nombre"
                value={displayName}
                textContentType="name"
                autoCapitalize="none"
                onChangeText={(u) => setDisplayName(u)}
              />
            </Spacer>
            <Spacer size="large">
              <AuthInput
                label="Contraseña"
                value={password}
                textContentType="password"
                secureTextEntry
                autoCapitalize="none"
                onChangeText={(p) => setPassword(p)}
              />
            </Spacer>
            <Spacer size="large">
              <AuthInput
                label="Repetir Contraseña"
                value={repeatedPassword}
                textContentType="password"
                secureTextEntry
                autoCapitalize="none"
                onChangeText={(p) => setRepeatedPassword(p)}
              />
            </Spacer>
            {error && (
              <ErrorContainer size="large">
                <Text variant="error">{error}</Text>
              </ErrorContainer>
            )}
            {notification && (
              <ErrorContainer size="large">
                <Text variant="success">{notification}</Text>
              </ErrorContainer>
            )}
            <Spacer size="large">
              <AuthButton
                icon="email"
                mode="contained"
                onPress={() => onRegister(email, password, displayName, repeatedPassword, clearInputs)}
                disabled={!email || !displayName || !password || !repeatedPassword || isLoading}
                loading={isLoading}
              >
                Registrarse
              </AuthButton>
            </Spacer>
          </AccountContainer>
          <Spacer size="large">
            <AuthSecondaryButton mode="contained" onPress={() => {
              clearError();
              clearNotification();
              navigation.goBack()
            }}>
              Atrás
            </AuthSecondaryButton>
          </Spacer>
        </AccountBackground>
      </ScrollView>
    </SafeArea>
  );
};
