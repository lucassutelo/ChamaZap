import { Platform } from 'react-native';

/** Grade de 4 pt usada em todo o app (docs/design/PROPOSTA.md, seção 5.3). */
export const spacing = {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
};

export const radius = {
    chip: 8,
    field: Platform.OS === 'ios' ? 20 : 16,
    button: 28,
};

/** Limites de ampliação da fonte do sistema para o layout não quebrar acima do teclado. */
export const maxFontScale = {
    title: 1.5,
    body: 1.6,
    number: 1.3,
    control: 1.4,
};
