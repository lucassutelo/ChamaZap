import React from 'react';
import { Linking } from 'react-native';
import styled from 'styled-components/native';
import LogoMark from '../../../components/LogoMark';
import { PRIVACY_POLICY_URL } from '../../../config';
import { maxFontScale, spacing } from '../../../styles/tokens';

const Header = styled.View`
    flex-direction: row;
    align-items: center;
    height: 52px;
    padding: 0 ${spacing.xl}px;
`;

const AppName = styled.Text`
    margin-left: 10px;
    color: ${props => props.theme.text};
    font-size: 17px;
    font-weight: 700;
    letter-spacing: -0.2px;
`;

const PrivacyLink = styled.Pressable`
    margin-left: auto;
    padding: ${spacing.md}px 0 ${spacing.md}px ${spacing.md}px;
`;

const PrivacyText = styled.Text`
    color: ${props => props.theme.textSecondary};
    font-size: 15px;
    font-weight: 500;
`;

export default function AppHeader() {
    return (
        <Header>
            <LogoMark size={30} />
            <AppName
                accessibilityRole="header"
                maxFontSizeMultiplier={maxFontScale.control}
            >
                Sem salvar
            </AppName>
            <PrivacyLink
                testID="privacy-link"
                accessibilityRole="link"
                accessibilityLabel="Política de privacidade"
                accessibilityHint="Abre no navegador"
                hitSlop={8}
                onPress={() => Linking.openURL(PRIVACY_POLICY_URL)}
            >
                <PrivacyText maxFontSizeMultiplier={maxFontScale.control}>
                    Privacidade
                </PrivacyText>
            </PrivacyLink>
        </Header>
    );
}
