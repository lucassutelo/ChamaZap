import React from 'react';
import styled, { useTheme } from 'styled-components/native';
import { AlertIcon, LockIcon } from '../../../components/Icons';
import { maxFontScale, spacing } from '../../../styles/tokens';

interface IProps {
    error?: string;
}

const Row = styled.View`
    flex-direction: row;
    align-items: center;
    margin-top: 10px;
    padding: 0 ${spacing.xs}px;
`;

const Message = styled.Text<{ $error: boolean }>`
    flex-shrink: 1;
    margin-left: 6px;
    color: ${props =>
        props.$error ? props.theme.danger : props.theme.textSecondary};
    font-size: 13px;
    line-height: 18px;
    font-weight: ${props => (props.$error ? 500 : 400)};
`;

export default function Helper({ error }: IProps) {
    const theme = useTheme();

    return (
        <Row accessibilityLiveRegion="polite">
            {error ? (
                <AlertIcon color={theme.danger} />
            ) : (
                <LockIcon color={theme.textSecondary} />
            )}
            <Message $error={!!error} maxFontSizeMultiplier={maxFontScale.body}>
                {error ?? 'O número não fica salvo na agenda nem no app.'}
            </Message>
        </Row>
    );
}
