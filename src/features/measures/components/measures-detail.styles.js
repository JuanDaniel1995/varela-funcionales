import styled from "styled-components/native";
import { Button, TextInput } from "react-native-paper";

import { colors } from "../../../infrastructure/theme/colors";

export const MeasureButton = styled(Button).attrs({
  color: colors.brand.primary,
})`
  padding: ${(props) => props.theme.space[2]};
`;

export const SuggestionsContainer = styled.View`
  marginTop: ${(props) => props.theme.space[2]};
  flex-direction: row;
  justify-content: space-around;
`;
