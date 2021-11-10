import styled from "styled-components/native";
import { FlatList, Text } from "react-native";
import { List, ActivityIndicator, Button, TextInput } from "react-native-paper";

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

export const InnerLoading = styled(ActivityIndicator)`
  marginTop: ${(props) => props.theme.space[2]};
`;

export const SchedulesList = styled(FlatList)`
  marginTop: ${(props) => props.theme.space[2]};
  width: 100%;
`;

export const ScheduleRowSecondaryText = styled(Text)`
  marginBottom: ${(props) => props.theme.space[2]};
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

export const Accordion = styled(List.Accordion)`
  background-color: white;
  borderBottomWidth: 1px;
  borderBottomColor: #F0F4FA;
`

export const InnerAccordion = styled(List.Accordion)`
  background-color: white;
  borderWidth: 1px;
  borderColor: #F0F4FA;
`

export const CancelButton = styled(Button)`
  marginRight: ${(props) => props.theme.space[4]};
`;
