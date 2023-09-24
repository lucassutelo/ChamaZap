import {Alert, Linking} from 'react-native';

export default async function OpenChat(number: string): Promise<void> {
    //Verifica se o dispositivo possui whatsapp instalado
    const isWhatsappInstalled = await Linking.canOpenURL(
        `whatsapp://send?phone=+55${number}`,
    );

    if (!isWhatsappInstalled) {
        Alert.alert(
            'Atenção!',
            'Você precisa ter o Whatsapp instalado em seu aparelho.',
        );

        return;
    }

    await Linking.openURL(`whatsapp://send?phone=+55${number}`);
}
