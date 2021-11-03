import React, { useContext } from "react";
import { ActivityIndicator, Colors, Paragraph } from "react-native-paper";

import { Spacer } from "../../../components/spacer/spacer.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import {
  AccountBackground,
  AccountContainer,
  AuthButton,
  Title,
  LoadingBackground,
  ExternalLoginButton,
} from "../components/account.styles";

export const AccountScreen = ({ navigation }) => {
  const { isLoading, clearError, onGoogleLogin, onFacebookLogin } = useContext(AuthenticationContext);
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
                  navigation.navigate("Login")
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
                  navigation.navigate("Register")
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
