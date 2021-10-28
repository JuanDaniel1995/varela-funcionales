import React, { useState, useEffect, useContext } from "react";
import { List, ActivityIndicator, Colors } from 'react-native-paper';

import { AuthenticationContext } from "../../../services/authentication/authentication.context";

import { Measure } from "./measure-item.component";

import { colors } from "../../../infrastructure/theme/colors";

export const UserMeasure = ({ user, measures, isLoadingMeasures, forceCollapseUsers, onExpandUser, onAddMeasure }) => {
  const { currentUser } = useContext(AuthenticationContext);
  const [userMeasures, setUserMeasures] = useState([]);
  const [expanded, setExpanded] = useState(false);

  const handlePress = () => {
    if (!expanded) onExpandUser(user.uid);
    setExpanded(!expanded);
  };

  useEffect(() => {
    setUserMeasures(measures.filter((x) => x.uid === user.uid));
  }, [measures])

  useEffect(() => {
    if (forceCollapseUsers) setExpanded(false);
  }, [forceCollapseUsers])

  return (
    <List.Accordion title={user.displayName} expanded={expanded} onPress={handlePress} theme={{ colors: colors.brand }}>
      {currentUser.isAdmin &&
        <List.Item
          title="Agregar medicion"
          onPress={() => onAddMeasure(user)}
          left={props => <List.Icon {...props} icon="plus" color={colors.brand.primary} />} />}
      {isLoadingMeasures
        ? <ActivityIndicator size={50} animating={true} color={Colors.blue300} />
        : <Measure userMeasures={userMeasures} />
      }
    </List.Accordion>
  );
};
