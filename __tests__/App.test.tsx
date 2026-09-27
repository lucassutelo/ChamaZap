/**
 * @format
 */

import React from 'react';
import { Linking } from 'react-native';
import ReactTestRenderer from 'react-test-renderer';
import App from '../src';

jest.mock(
    'react-native-safe-area-context',
    () => require('react-native-safe-area-context/jest/mock').default,
);

async function render() {
    let tree!: ReactTestRenderer.ReactTestRenderer;

    await ReactTestRenderer.act(() => {
        tree = ReactTestRenderer.create(<App />);
    });

    return tree;
}

function findByTestId(tree: ReactTestRenderer.ReactTestRenderer, id: string) {
    return tree.root.findAll(node => node.props.testID === id)[0];
}

function textOf(tree: ReactTestRenderer.ReactTestRenderer) {
    return JSON.stringify(tree.toJSON());
}

describe('App', () => {
    const openURL = jest.spyOn(Linking, 'openURL').mockResolvedValue(undefined);

    beforeEach(() => openURL.mockClear());

    it('renders the home screen', async () => {
        const tree = await render();

        expect(textOf(tree)).toContain('Converse sem salvar o');
        expect(textOf(tree)).toContain('Abrir conversa');
        expect(textOf(tree)).toContain('Privacidade');
    });

    it('formats what is typed and opens the chat', async () => {
        const tree = await render();
        const input = findByTestId(tree, 'phone-input');

        await ReactTestRenderer.act(() => {
            input.props.onChangeText('11987654321');
        });

        expect(findByTestId(tree, 'phone-input').props.value).toBe(
            '(11) 98765-4321',
        );

        await ReactTestRenderer.act(async () => {
            await findByTestId(tree, 'open-chat-button').props.onPress();
        });

        expect(openURL).toHaveBeenCalledWith(
            'whatsapp://send?phone=+551187654321',
        );
        expect(findByTestId(tree, 'phone-input').props.value).toBe('');
    });

    it('explains an incomplete number inside the screen', async () => {
        const tree = await render();

        await ReactTestRenderer.act(() => {
            findByTestId(tree, 'phone-input').props.onChangeText('119876543');
        });
        await ReactTestRenderer.act(async () => {
            await findByTestId(tree, 'open-chat-button').props.onPress();
        });

        expect(openURL).not.toHaveBeenCalled();
        expect(textOf(tree)).toContain('Número incompleto — faltam 2 dígitos.');
    });

    it('opens the privacy policy', async () => {
        const tree = await render();

        await ReactTestRenderer.act(() => {
            findByTestId(tree, 'privacy-link').props.onPress();
        });

        expect(openURL).toHaveBeenCalledWith(
            'https://lucassutelo.github.io/ChamaZap/privacidade/',
        );
    });
});
