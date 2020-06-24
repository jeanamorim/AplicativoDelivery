import React from 'react';

import {
  Container,
  SuccessAnimationContainer,
  SuccessAnimation,
  SucessTextContainer,
  SucessTextHeader,
  SucessText,
  FailedAnimationContainer,
  FailedAnimation,
  ContinueButton,
} from './styles';

export default function PaymentResult({ navigation, route }) {
  const { status } = route.params;

  return (
    <Container status={status}>
      {status === 'success' ? (
        <>
          <SuccessAnimationContainer>
            <SuccessAnimation />
          </SuccessAnimationContainer>
          <SucessTextContainer>
            <SucessTextHeader>Pedido confirmado com Sucesso</SucessTextHeader>
            <SucessText>
              O app Meu delivery agradece. Agora é so aguardar que o
              estabelecimento irá levar ate você. Para mais detalhes, consulte
              Meus Pedidos.
            </SucessText>
          </SucessTextContainer>
        </>
      ) : (
        <>
          <FailedAnimationContainer>
            <FailedAnimation />
          </FailedAnimationContainer>
        </>
      )}
      <ContinueButton onPress={() => navigation.navigate('Home')}>
        Sair
      </ContinueButton>
    </Container>
  );
}
PaymentResult.navigationOptions = ({ navigation }) => ({
  title: 'Resultado do pedido',
});
