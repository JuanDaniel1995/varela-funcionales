import styled from "styled-components/native";
import { FlatList, Text } from "react-native";
import { ActivityIndicator, Button, TextInput } from "react-native-paper";

import { colors } from "../../../infrastructure/theme/colors";

export const Container = styled.View`
  flex: 1;
`;

export const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;

export const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;

export const SchedulesList = styled(FlatList)`
  marginTop: ${(props) => props.theme.space[2]};
  width: 100%;
`;

export const ScheduleRowTextContainer = styled.View`
  flex: 1;
  flex-basis: auto;
  flex-direction: row;
`;

export const ScheduleRowMainText = styled(Text)`
  color: ${(props) => props.theme.colors.brand.primary};
  marginRight: ${(props) => props.theme.space[4]};
`;

export const ScheduleButton = styled(Button).attrs({
  color: colors.brand.primary,
})`
  padding: ${(props) => props.theme.space[2]};
`;

export const SuggestionsContainer = styled.View`
  marginTop: ${(props) => props.theme.space[2]};
  flex-direction: row;
  justify-content: space-around;
`;

export const ScheduleInput = styled(TextInput)`
  width: 100%;
`;
