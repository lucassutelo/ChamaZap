/** Tokens de cor do design system (docs/design/PROPOSTA.md, seção 5.1). */
export interface Theme {
    statusBar: 'dark-content' | 'light-content';
    background: string;
    surface: string;
    surfaceMuted: string;
    border: string;
    outline: string;
    text: string;
    textSecondary: string;
    textTertiary: string;
    primary: string;
    primaryPressed: string;
    onPrimary: string;
    focusRing: string;
    danger: string;
    dangerRing: string;
}
