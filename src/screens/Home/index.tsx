/* eslint-disable @typescript-eslint/no-misused-promises */
import React, {useState} from 'react';
import {Alert, Image, Linking, Appearance} from 'react-native';
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

  const systemTheme = Appearance.getColorScheme();

  async function handleOpenChat() {
    let numberSend = number;

    if (numberSend.length < 10 || numberSend.length > 11) {
      Alert.alert('Atenção!', 'Digite um número válido.');

      return;
    }

    if (numberSend.length === 11)
      numberSend = numberSend.substring(0, 2) + numberSend.substring(3);

    try {
      await Linking.openURL(`whatsapp://send?phone=+55${numberSend}`);
    } catch (err) {
      //O dispositivo pode não ter whatsapp instalado, então tentará pelo navegador
      await Linking.openURL(`https://wa.me/+55${numberSend}`);
    }

    setNumber('');
  }

  return (
    <Container
      style={systemTheme === 'dark' ? {backgroundColor: '#000'} : null}>
      <BoxLogo>
        <Image source={require('../../assets/2.png')} resizeMode="contain" />
      </BoxLogo>

      <BoxActions>
        <Input
          style={
            systemTheme === 'dark' ? {color: '#FFF', borderColor: '#CCC'} : null
          }
          autoFocus
          value={number}
          keyboardType="phone-pad"
          placeholder="Digite o número"
          placeholderTextColor="#BBB"
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
