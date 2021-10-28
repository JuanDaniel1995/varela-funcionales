import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { TextInput } from "react-native-paper";

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

export const PeriodContainer = styled(TouchableOpacity)`
  padding-left: ${(props) => props.theme.space[3]};
  width: 30%;
`;

export const PeriodInput = styled(TextInput)`
  width: 100%;
`;

export const MeasureInput = styled(TextInput)`
  width: 100%;
`;