import React, { useState, useContext, useEffect } from "react";

import { SafeArea } from "../../../components/utility/safe-area.component";
import {
  AccountBackground,
  AccountContainer,
  AuthButton,
  AuthInput,
  ErrorContainer,
  Title,
} from "../components/account.styles";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";

export const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated, onLogin, error, isLoading, clearError, clearNotification } = useContext(AuthenticationContext);

  useEffect(() => {
    if (isAuthenticated) navigation.pop();
  }, [isAuthenticated])

  return (
    <SafeArea>
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
              label="Contraseña"
              value={password}
              textContentType="password"
              secureTextEntry
              autoCapitalize="none"
              onChangeText={(p) => setPassword(p)}
            />
          </Spacer>
          {error && (
            <ErrorContainer size="large">
              <Text variant="error">{error}</Text>
            </ErrorContainer>
          )}
          <Spacer size="large">
            <AuthButton
              icon="lock-open-outline"
              mode="contained"
              onPress={() => onLogin(email, password)}
              disabled={!email || !password || isLoading}
              loading={isLoading}
            >
              Iniciar sesión
            </AuthButton>
          </Spacer>
        </AccountContainer>
        <Spacer size="large">
          <AuthButton mode="contained" onPress={() => {
            clearError();
            clearNotification();
            navigation.goBack();
          }}>
            Atrás
          </AuthButton>
        </Spacer>
      </AccountBackground>
    </SafeArea>
  );
};
