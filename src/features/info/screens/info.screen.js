import React from "react";
import { Card } from 'react-native-paper';

import { SafeArea } from "../../../components/utility/safe-area.component";
import { Spacer } from "../../../components/spacer/spacer.component";

export const InfoScreen = () => {
  return (
    <SafeArea>
      <Card.Title
        title="Objetivos"
        subtitle="Aqui va el objetivo"
      />
      <Spacer position="bottom" size="large" />
      <Card.Title
        title="Mision"
        subtitle="Aqui va mision"
      />
    </SafeArea>
  )
}
