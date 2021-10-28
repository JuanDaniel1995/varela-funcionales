import React, { useContext } from "react";
import { ActivityIndicator, Colors, Paragraph } from "react-native-paper";
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';

import { Spacer } from "../../../components/spacer/spacer.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import {
  AccountBackground,
  AccountContainer,
  AuthButton,
  Title,
  LoadingBackground,
  GoogleButton,
} from "../components/account.styles";

export const AccountScreen = ({ navigation }) => {
  const { isLoading, onGoogleLogin } = useContext(AuthenticationContext);
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
                onPress={() => navigation.navigate("Login")}
              >
                Iniciar sesión
              </AuthButton>
            </Spacer>
            <Spacer size="large">
              <AuthButton
                icon="email"
                mode="contained"
                onPress={() => navigation.navigate("Register")}
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
              <GoogleButton onPress={onGoogleLogin}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Light} />
            </Spacer>
            {/* <Spacer size="large">
            <AuthButton
              icon="facebook"
              mode="contained"
              onPress={() => navigation.navigate("Register")}
            >
              Facebook
            </AuthButton>
          </Spacer> */}
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
