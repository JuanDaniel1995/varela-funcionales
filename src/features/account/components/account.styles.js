import styled from "styled-components/native";
import { Button, TextInput } from "react-native-paper";

import { colors } from "../../../infrastructure/theme/colors";
import { Text } from "../../../components/typography/text.component";

export const LoadingBackground = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const AccountBackground = styled.View`
  flex: 1;
  align-items: center;
`;

export const AccountContainer = styled.View`
  width: 100%;
`;

export const AuthButton = styled(Button).attrs({
  color: colors.brand.primary,
})`
  padding: ${(props) => props.theme.space[2]} 0;
  width: 100%;
`;

export const AuthInput = styled(TextInput)`
  width: 100%;
`;

export const ExternalLoginButton = styled(Button).attrs({
  color: colors.brand.secondary,
})`
  padding: ${(props) => props.theme.space[2]} 0;
  width: 100%;
`;

export const Title = styled(Text)`
  font-size: 30px;
  margin-top: ${(props) => props.theme.space[2]};
  margin-bottom: ${(props) => props.theme.space[4]};
`;

export const ErrorContainer = styled.View`
  max-width: 300px;
  align-items: center;
  align-self: center;
  margin-top: ${(props) => props.theme.space[2]};
  margin-bottom: ${(props) => props.theme.space[2]};
`;

export const NoSessionContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const NoSessionButton = styled(Button).attrs({
  color: colors.brand.primary,
})`
  marginTop: ${(props) => props.theme.space[3]};
  padding: ${(props) => props.theme.space[2]} 0;
  width: 60%;
`;
