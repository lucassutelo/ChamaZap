/* eslint-disable @typescript-eslint/no-misused-promises */
import React, {useState} from 'react';
import {Alert, Image, Linking} from 'react-native';
import {
  BoxActions,
  BoxLogo,
  Button,
  ButtonTxt,
  Container,
  Input,
} from './styles';

export default function Home() {
  const [number, setNumber] = useState('');

  async function handleOpenChat() {
    let numberSend = number;

    if (numberSend.length < 10 || numberSend.length > 11) {
      Alert.alert('Atenção!', 'Digite um número válido.');

      return;
    }

    if (numberSend.length === 11)
      numberSend = numberSend.substring(0, 2) + numberSend.substring(3);

    try {
      await Linking.openURL(`whatsapp://send?phone=${numberSend}`);
    } catch (err) {
      //O dispositivo pode não ter whatsapp instalado, então tentará pelo navegador
      await Linking.openURL(`https://wa.me/${numberSend}`);
    }

    setNumber('');
  }

  return (
    <Container>
      <BoxLogo>
        <Image source={require('../../assets/2.png')} resizeMode="contain" />
      </BoxLogo>

      <BoxActions>
        <Input
          autoFocus
          value={number}
          keyboardType="phone-pad"
          placeholder="Digite o número"
          placeholderTextColor="#CCC"
          returnKeyType="send"
          onSubmitEditing={() => handleOpenChat()}
          onChangeText={(masked, unmasked) => {
            setNumber(unmasked);
          }}
          mask={[
            '(',
            /\d/,
            /\d/,
            ')',
            ' ',
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            '-',
            /\d/,
            /\d/,
            /\d/,
            /\d/,
          ]}
        />
        <Button onPress={() => handleOpenChat()}>
          <ButtonTxt>Abrir conversa</ButtonTxt>
        </Button>
      </BoxActions>
    </Container>
  );
}
