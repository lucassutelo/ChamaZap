import React from 'react';
import { Platform, Pressable } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import { ArrowUpRightIcon } from '../../../components/Icons';
import { maxFontScale, radius } from '../../../styles/tokens';

interface IProps {
    label: string;
    accessibilityLabel?: string;
    /** Estilo apagado enquanto o número está incompleto; o toque continua explicando o que falta. */
    muted?: boolean;
    testID?: string;
    onPress(): void;
}

const Body = styled.View<{ $background: string }>`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    min-height: 56px;
    padding: 0 24px;
    border-radius: ${radius.button}px;
    background-color: ${props => props.$background};
`;

const Label = styled.Text<{ $color: string }>`
    margin-right: 8px;
    color: ${props => props.$color};
    font-size: ${Platform.OS === 'ios' ? 17 : 16}px;
    font-weight: ${Platform.OS === 'ios' ? 600 : 500};
    letter-spacing: ${Platform.OS === 'ios' ? -0.1 : 0.1}px;
`;

export default function PrimaryButton(props: IProps) {
    const { label, accessibilityLabel, muted, testID, onPress } = props;
    const theme = useTheme();

    return (
        <Pressable
            testID={testID}
            accessibilityRole="button"
            accessibilityLabel={accessibilityLabel ?? label}
            onPress={onPress}
        >
            {({ pressed }) => {
                const background = muted
                    ? theme.surfaceMuted
                    : pressed
                    ? theme.primaryPressed
                    : theme.primary;
                const color = muted ? theme.textTertiary : theme.onPrimary;

                return (
                    <Body $background={background}>
                        <Label
                            $color={color}
                            maxFontSizeMultiplier={maxFontScale.control}
                        >
                            {label}
                        </Label>
                        <ArrowUpRightIcon color={color} />
                    </Body>
                );
            }}
        </Pressable>
    );
}
