import { Alert } from 'react-native';

export default function ValidateNumber(number: string): string | undefined {
    if (number.length < 10 || number.length > 11) {
        Alert.alert('Atenção!', 'Digite um número válido.');

        return;
    }

    if (number.length === 11) {
        return number.substring(0, 2) + number.substring(3);
    } else {
        return number;
    }
}
