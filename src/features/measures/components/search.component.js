import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { Searchbar } from "react-native-paper";

const SearchContainer = styled.View`
  padding: ${(props) => props.theme.space[3]};
  width: 100%;
`;

export const Search = ({ onSubmit }) => {
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    if (!searchKeyword) onSubmit('')
  }, [searchKeyword])

  return (
    <SearchContainer>
      <Searchbar
        placeholder="Buscar usuario por nombre"
        value={searchKeyword}
        onSubmitEditing={() => onSubmit(searchKeyword)}
        onChangeText={(text) => setSearchKeyword(text)}
        onIconPress={() => onSubmit(searchKeyword)}
      />
    </SearchContainer>
  );
};
