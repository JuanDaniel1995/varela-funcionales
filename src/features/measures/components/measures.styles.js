import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { List, ActivityIndicator } from "react-native-paper";
import { TextInput } from "react-native-paper";

export const Container = styled.View`
  flex: 1;
  width: 100%;
`;

export const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;

export const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;

export const PeriodContainer = styled(TouchableOpacity)`
  padding-left: ${(props) => props.theme.space[3]};
  width: 30%;
`;

export const PeriodInput = styled(TextInput)`
  width: 100%;
`;

export const MeasureContainer = styled.View`
  margin-bottom: ${(props) => props.theme.space[3]};
`;

export const MeasureInput = styled(TextInput)`
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