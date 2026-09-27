const MAX_DIGITS = 11;

/**
 * Extrai os dígitos do que foi digitado ou colado no campo.
 *
 * Ao colar um número completo (ex.: "+55 11 98765-4321" ou "(011) 98765-4321"), remove o código do país e o
 * zero de longa distância. Enquanto a pessoa digita, só limita a 11 dígitos — assim o DDD 55 continua válido.
 */
export function normalizeNumber(text: string, previous = ''): string {
    let digits = text.replace(/\D/g, '');
    const pasted = digits.length - previous.length > 1;

    if (pasted && digits.length > MAX_DIGITS) {
        if (digits.startsWith('55')) {
            digits = digits.substring(2);
        }

        digits = digits.replace(/^0+/, '');
    }

    return digits.substring(0, MAX_DIGITS);
}

/** Máscara (00) 00000-0000 para celular (começa com 9) e (00) 0000-0000 para fixo. */
export function formatNumber(digits: string): string {
    if (digits.length === 0) return '';
    if (digits.length <= 2) return `(${digits}`;

    const ddd = digits.substring(0, 2);
    const rest = digits.substring(2);
    const firstPart = rest.startsWith('9') ? 5 : 4;

    if (rest.length <= firstPart) return `(${ddd}) ${rest}`;

    return `(${ddd}) ${rest.substring(0, firstPart)}-${rest.substring(
        firstPart,
    )}`;
}
