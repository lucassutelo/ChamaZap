import React, { useRef, useState } from 'react';
import { Platform, type TextInputInstance } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import { maxFontScale, radius, spacing } from '../../../styles/tokens';
import { formatNumber, normalizeNumber } from '../functions/FormatNumber';

interface IProps {
    number: string;
    error?: string;
    onChangeNumber(number: string): void;
    onSubmit(): void;
}

const RING = 4;

const Ring = styled.Pressable<{ $color: string }>`
    margin: ${spacing.xxl - RING}px -${RING}px 0;
    padding: ${RING}px;
    border-radius: ${radius.field + RING}px;
    background-color: ${props => props.$color};
`;

const Field = styled.View<{ $borderColor: string }>`
    padding: 10px 14px 8px 16px;
    border-width: 2px;
    border-color: ${props => props.$borderColor};
    border-radius: ${radius.field}px;
    background-color: ${props => props.theme.surface};
`;

const FieldTop = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    min-height: 26px;
`;

const Label = styled.Text<{ $color: string }>`
    color: ${props => props.$color};
    font-size: 13px;
    line-height: 18px;
    font-weight: 600;
`;

const CountryChip = styled.View`
    flex-direction: row;
    align-items: center;
    height: 26px;
    padding: 0 9px 0 7px;
    border-radius: ${radius.chip}px;
    background-color: ${props => props.theme.surfaceMuted};
`;

const CountryText = styled.Text`
    color: ${props => props.theme.text};
    font-size: 14px;
    font-weight: 600;
    font-variant: tabular-nums;
`;

const Input = styled.TextInput`
    height: 46px;
    margin-top: 2px;
    padding: 0;
    color: ${props => props.theme.text};
    font-size: 30px;
    font-weight: ${Platform.OS === 'ios' ? 600 : 500};
    letter-spacing: 0.3px;
    font-variant: tabular-nums;
`;

export default function PhoneField(props: IProps) {
    const { number, error, onChangeNumber, onSubmit } = props;
    const theme = useTheme();
    const input = useRef<TextInputInstance>(null);
    const [focused, setFocused] = useState(true);

    const accent = error ? theme.danger : focused ? theme.primary : undefined;

    return (
        <Ring
            accessible={false}
            $color={
                error
                    ? theme.dangerRing
                    : focused
                    ? theme.focusRing
                    : 'transparent'
            }
            onPress={() => input.current?.focus()}
        >
            <Field $borderColor={accent ?? theme.outline}>
                <FieldTop>
                    <Label
                        $color={accent ?? theme.textSecondary}
                        maxFontSizeMultiplier={maxFontScale.control}
                    >
                        Número com DDD
                    </Label>
                    <CountryChip accessibilityLabel="Código do Brasil, mais 55">
                        <CountryText
                            maxFontSizeMultiplier={maxFontScale.control}
                        >
                            🇧🇷 +55
                        </CountryText>
                    </CountryChip>
                </FieldTop>
                <Input
                    ref={input}
                    testID="phone-input"
                    autoFocus
                    value={formatNumber(number)}
                    keyboardType="phone-pad"
                    placeholder="(11) 91234-5678"
                    placeholderTextColor={theme.textTertiary}
                    selectionColor={theme.primary}
                    cursorColor={theme.primary}
                    returnKeyType="send"
                    submitBehavior="submit"
                    maxFontSizeMultiplier={maxFontScale.number}
                    accessibilityLabel="Número de telefone com DDD"
                    accessibilityHint="O código do Brasil, mais 55, já está incluído"
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    onSubmitEditing={() => onSubmit()}
                    onChangeText={text =>
                        onChangeNumber(normalizeNumber(text, number))
                    }
                />
            </Field>
        </Ring>
    );
}
