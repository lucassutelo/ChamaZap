/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState } from 'react';
import { Image } from 'react-native';
import { BoxActions, BoxLogo, Button, ButtonTxt, Container } from './styles';
import InputNumber from './components/InputNumber';
import ValidateNumber from './functions/ValidateNumber';
import OpenChat from './functions/OpenChat';

export default function Home() {
    const [number, setNumber] = useState('');

    async function handleOpenChat() {
        const numberSend = ValidateNumber(number);

        if (!numberSend) return;

        await OpenChat(numberSend);

        setNumber('');
    }

    return (
        <Container>
            <BoxLogo>
                <Image
                    source={require('../../assets/2.png')}
                    resizeMode="contain"
                />
            </BoxLogo>

            <BoxActions>
                <InputNumber
                    handleOpenChat={handleOpenChat}
                    number={number}
                    setNumber={setNumber}
                />
                <Button onPress={() => handleOpenChat()}>
                    <ButtonTxt>Abrir conversa</ButtonTxt>
                </Button>
            </BoxActions>
        </Container>
    );
}
