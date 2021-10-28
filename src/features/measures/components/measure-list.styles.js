import styled from "styled-components/native";
import { FlatList } from "react-native";

export const MeasuresList = styled(FlatList)`
  marginTop: ${(props) => props.theme.space[4]};
  width: 100%;
`;
