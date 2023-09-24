import React from 'react';
import {Appearance} from 'react-native';
import {Input} from '../styles';

interface IProps {
    number: string;
    setNumber: (number: string) => void;
    handleOpenChat(): void;
}

export default function InputNumber(props: IProps) {
    const {number, setNumber, handleOpenChat} = props;

    const systemTheme = Appearance.getColorScheme();

    return (
        <Input
            style={
                systemTheme === 'dark'
                    ? {color: '#FFF', borderColor: '#CCC'}
                    : null
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
    );
}
