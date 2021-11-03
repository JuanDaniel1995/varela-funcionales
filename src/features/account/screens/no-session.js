import React from "react";

import { SafeArea } from "../../../components/utility/safe-area.component";

import { NoSessionContainer, NoSessionButton } from "../components/account.styles";
import { Text } from "../../../components/typography/text.component";

export const NoSession = ({ redirectToLogin }) => {
  return (
    <SafeArea>
      <NoSessionContainer>
        <Text>Para ingresar a esta pantalla debe iniciar sesión</Text>
        <Text>¿Desea hacerlo? Pulse el botón de abajo</Text>
        <NoSessionButton mode="contained" onPress={redirectToLogin}>
          Iniciar sesión
        </NoSessionButton>
      </NoSessionContainer>
    </SafeArea>
  );
};