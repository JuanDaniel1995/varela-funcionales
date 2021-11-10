import React, { useState, useEffect, useContext } from "react";
import { StyleSheet } from "react-native";
import { ActivityIndicator, Colors } from 'react-native-paper';

import { AuthenticationContext } from "../../../services/authentication/authentication.context";

import { Accordion } from "./measures.styles";
import { Measure } from "./measure-item.component";

import { colors } from "../../../infrastructure/theme/colors";

const defaultFolds = [{
  key: 'rightArm',
  measure: 0,
  toBeMeasured: 'Brazo derecho'
},
{
  key: 'leftArm',
  measure: 0,
  toBeMeasured: 'Brazo izquierdo'
},
{
  key: 'chest',
  measure: 0,
  toBeMeasured: 'Pecho'
},
{
  key: 'waist',
  measure: 0,
  toBeMeasured: 'Cintura'
},
{
  key: 'hip',
  measure: 0,
  toBeMeasured: 'Cadera'
},
{
  key: 'rightFoot',
  measure: 0,
  toBeMeasured: 'Pie derecho'
},
{
  key: 'leftFoot',
  measure: 0,
  toBeMeasured: 'Pie izquierdo'
},
{
  key: 'rightCalf',
  measure: 0,
  toBeMeasured: 'Pantorrilla derecha'
},
{
  key: 'leftCalf',
  measure: 0,
  toBeMeasured: 'Pantorrilla izquierda'
}]

const defaultMeasures = [{
  key: 'weight',
  measure: 0,
  toBeMeasured: 'Peso'
},
{
  key: 'bodyFat',
  measure: 0,
  toBeMeasured: 'Grasa corporal'
},
{
  key: 'imc',
  measure: 0,
  toBeMeasured: 'IMC'
},
{
  key: 'visceralFat',
  measure: 0,
  toBeMeasured: 'Grasa visceral'
},
{
  key: 'muscleMass',
  measure: 0,
  toBeMeasured: 'Masa muscular'
},
{
  key: 'percentageWater',
  measure: 0,
  toBeMeasured: 'Porcentaje agua'
},
{
  key: 'metabolicAge',
  measure: 0,
  toBeMeasured: 'Edad metabólica'
}]

export const UserMeasure = ({ user, measures, isLoadingMeasures, forceCollapseUsers, onExpandUser, onAddMeasure }) => {
  const { currentUser } = useContext(AuthenticationContext);
  const [userFolds, setUserFolds] = useState([]);
  const [userMeasures, setUserMeasures] = useState([]);
  const [expanded, setExpanded] = useState(false);

  const handlePress = () => {
    if (!expanded) onExpandUser(user.uid);
    setExpanded(!expanded);
  };

  useEffect(() => {
    const savedMeasures = measures.filter((x) => x.uid === user.uid);
    const initialMeasures = defaultMeasures.map((x) => {
      const { toBeMeasured } = x;
      let { measure } = x;
      let id = null;
      const savedMeasure = savedMeasures.find((y) => y.toBeMeasured === toBeMeasured);
      if (savedMeasure) {
        id = savedMeasure.id;
        measure = savedMeasure.measure;
      }
      return ({ ...x, uid: user.uid, id, measure })
    });
    const initialFolds = defaultFolds.map((x) => {
      const { toBeMeasured } = x;
      let { measure } = x;
      let id = null;
      const savedFold = savedMeasures.find((y) => y.toBeMeasured === toBeMeasured);
      if (savedFold) {
        id = savedFold.id;
        measure = savedFold.measure;
      }
      return ({ ...x, uid: user.uid, id, measure })
    });
    setUserMeasures(initialMeasures);
    setUserFolds(initialFolds);
  }, [measures])

  useEffect(() => {
    if (forceCollapseUsers) setExpanded(false);
  }, [forceCollapseUsers])

  return (
    <Accordion
      title={user.displayName}
      titleStyle={expanded ? styles.headerExpanded : styles.headerCollapsed}
      expanded={expanded}
      onPress={handlePress}
      theme={{ colors: colors.brand }}>
      {isLoadingMeasures
        ? <ActivityIndicator size={50} animating={true} color={Colors.blue300} />
        : <Measure
          userFolds={userFolds}
          userMeasures={userMeasures}
          isAdmin={currentUser.isAdmin}
          user={user}
          onAddMeasure={onAddMeasure}
          forceCollapseUsers={forceCollapseUsers} />
      }
    </Accordion>
  );
};

const styles = StyleSheet.create({
  headerExpanded: {
    fontFamily: 'Lato-Black',
  },
  headerCollapsed: {
    fontFamily: 'Lato-Regular',
  },
})
