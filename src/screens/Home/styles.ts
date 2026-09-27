import { Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { spacing } from '../../styles/tokens';

export const Screen = styled(SafeAreaView)`
    flex: 1;
    background-color: ${props => props.theme.background};
`;

export const Body = styled.KeyboardAvoidingView`
    flex: 1;
`;

export const Content = styled.ScrollView.attrs({
    contentContainerStyle: {
        paddingTop: spacing.md,
        paddingHorizontal: spacing.xl,
        paddingBottom: spacing.lg,
    },
    keyboardShouldPersistTaps: 'handled',
    showsVerticalScrollIndicator: false,
})`
    flex: 1;
`;

export const Title = styled.Text`
    color: ${props => props.theme.text};
    font-size: 28px;
    line-height: 34px;
    font-weight: 700;
    letter-spacing: ${Platform.OS === 'ios' ? -0.4 : 0}px;
`;

export const Lead = styled.Text`
    margin-top: ${spacing.sm}px;
    color: ${props => props.theme.textSecondary};
    font-size: 16px;
    line-height: 22px;
`;

export const Footer = styled.View`
    padding: 0 ${spacing.xl}px ${spacing.lg}px;
`;
