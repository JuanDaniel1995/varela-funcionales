import React, { useContext, useEffect } from "react";
import { ActivityIndicator, Colors } from "react-native-paper";

import { Spacer } from "../../../components/spacer/spacer.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import {
  AccountBackground,
  AccountContainer,
  AuthButton,
  Title,
  Paragraph,
  LoadingBackground,
  ExternalLoginButton,
} from "../components/account.styles";

import { colors } from "../../../infrastructure/theme/colors";

export const AccountScreen = ({ navigation, route }) => {
  const { isAuthenticated, isLoading, clearError, onGoogleLogin, onFacebookLogin } = useContext(AuthenticationContext);
  const { module } = route.params;

  useEffect(() => {
    if (isAuthenticated) navigation.pop();
  }, [isAuthenticated])

  return (
    !isLoading ? (
      <SafeArea>
        <AccountBackground>
          <Title>Varela funcionales</Title>
          <AccountContainer>
            <Spacer size="large">
              <AuthButton
                icon="lock-open-outline"
                mode="contained"
                onPress={() => {
                  clearError();
                  navigation.push(`${module}Login`);
                }}
              >
                Iniciar sesión
              </AuthButton>
            </Spacer>
            <Spacer size="large">
              <AuthButton
                icon="email"
                mode="contained"
                onPress={() => {
                  clearError();
                  navigation.push(`${module}Register`);
                }}
              >
                Crear cuenta
              </AuthButton>
            </Spacer>
            <Spacer size="large">
              <Paragraph>
                O inicia sesión con
              </Paragraph>
            </Spacer>
            <Spacer size="large">
              <ExternalLoginButton
                icon="google"
                mode="contained"
                onPress={onGoogleLogin}>
                Google
              </ExternalLoginButton>
            </Spacer>
            <Spacer size="large">
              <ExternalLoginButton
                icon="facebook"
                mode="contained"
                onPress={onFacebookLogin}>
                Facebook
              </ExternalLoginButton>
            </Spacer>
          </AccountContainer>
        </AccountBackground>
      </SafeArea>
    ) : (
      <LoadingBackground>
        <ActivityIndicator animating={true} color={Colors.blue300} />
      </LoadingBackground>
    )
  );
};
