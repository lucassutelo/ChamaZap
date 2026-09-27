import React, { useState } from 'react';
import { AccessibilityInfo } from 'react-native';
import { Body, Content, Footer, Lead, Screen, Title } from './styles';
import AppHeader from './components/AppHeader';
import Helper from './components/Helper';
import PhoneField from './components/PhoneField';
import PrimaryButton from './components/PrimaryButton';
import ValidateNumber from './functions/ValidateNumber';
import OpenChat from './functions/OpenChat';
import { maxFontScale } from '../../styles/tokens';

export default function Home() {
    const [number, setNumber] = useState('');
    const [error, setError] = useState<string>();
    const validation = ValidateNumber(number);

    function handleChangeNumber(value: string) {
        setNumber(value);
        setError(undefined);
    }

    async function handleOpenChat() {
        if (!validation.valid) {
            setError(validation.message);
            AccessibilityInfo.announceForAccessibility(validation.message);

            return;
        }

        await OpenChat(validation.number);

        setNumber('');
    }

    return (
        <Screen>
            <Body behavior="padding">
                <AppHeader />
                <Content>
                    <Title
                        accessibilityRole="header"
                        maxFontSizeMultiplier={maxFontScale.title}
                    >
                        Converse sem salvar o{' '}contato
                    </Title>
                    <Lead maxFontSizeMultiplier={maxFontScale.body}>
                        Digite o número com DDD. A conversa abre direto no
                        WhatsApp.
                    </Lead>
                    <PhoneField
                        number={number}
                        error={error}
                        onChangeNumber={handleChangeNumber}
                        onSubmit={handleOpenChat}
                    />
                    <Helper error={error} />
                </Content>
                <Footer>
                    <PrimaryButton
                        testID="open-chat-button"
                        label="Abrir conversa"
                        accessibilityLabel="Abrir conversa no WhatsApp"
                        muted={!validation.valid}
                        onPress={handleOpenChat}
                    />
                </Footer>
            </Body>
        </Screen>
    );
}
