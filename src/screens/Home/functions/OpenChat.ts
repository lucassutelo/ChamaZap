import { Alert, Linking } from 'react-native';

export default async function OpenChat(number: string): Promise<void> {
    try {
        await Linking.openURL(`whatsapp://send?phone=+55${number}`);
    } catch {
        try {
            // Link oficial: abre o WhatsApp Business ou, sem nenhum app instalado, a página do WhatsApp.
            await Linking.openURL(`https://wa.me/55${number}`);
        } catch {
            Alert.alert(
                'Atenção!',
                'Você precisa ter o Whatsapp instalado em seu aparelho.',
            );
        }
    }
}
