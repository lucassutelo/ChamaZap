import { Alert, Linking } from 'react-native';
import OpenChat from '../src/screens/Home/functions/OpenChat';

describe('OpenChat', () => {
    const openURL = jest.spyOn(Linking, 'openURL');
    const alert = jest.spyOn(Alert, 'alert').mockImplementation(() => {});

    beforeEach(() => {
        openURL.mockReset();
        alert.mockClear();
    });

    it('opens WhatsApp only once', async () => {
        openURL.mockResolvedValue(undefined);

        await OpenChat('1187654321');

        expect(openURL).toHaveBeenCalledTimes(1);
        expect(openURL).toHaveBeenCalledWith(
            'whatsapp://send?phone=+551187654321',
        );
    });

    it('falls back to wa.me when the WhatsApp scheme cannot be opened', async () => {
        openURL
            .mockRejectedValueOnce(new Error('not installed'))
            .mockResolvedValueOnce(undefined);

        await OpenChat('1187654321');

        expect(openURL).toHaveBeenLastCalledWith('https://wa.me/551187654321');
        expect(alert).not.toHaveBeenCalled();
    });

    it('alerts when nothing can open the chat', async () => {
        openURL.mockRejectedValue(new Error('no handler'));

        await OpenChat('1187654321');

        expect(alert).toHaveBeenCalledTimes(1);
    });
});
