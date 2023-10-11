import { Alert, Linking } from 'react-native';

export default async function OpenChat(number: string): Promise<void> {
    try {
        await Linking.openURL(`whatsapp://send?phone=+55${number}`);
    } catch (error) {
        Alert.alert(
            'Atenção!',
            'Você precisa ter o Whatsapp instalado em seu aparelho.',
        );

        return;
    }

    await Linking.openURL(`whatsapp://send?phone=+55${number}`);
}
