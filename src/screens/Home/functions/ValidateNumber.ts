export type Validation =
    | { valid: true; number: string }
    | { valid: false; message: string };

export default function ValidateNumber(number: string): Validation {
    if (number.length === 0) {
        return { valid: false, message: 'Digite o número com DDD.' };
    }

    if (number.startsWith('0')) {
        return {
            valid: false,
            message: 'Digite o DDD sem o zero da frente (ex.: 11).',
        };
    }

    // Celulares têm 11 dígitos e começam com 9 depois do DDD; fixos têm 10.
    const required = number.charAt(2) === '9' ? 11 : 10;

    if (number.length < required) {
        const missing = required - number.length;

        return {
            valid: false,
            message:
                missing === 1
                    ? 'Número incompleto — falta 1 dígito.'
                    : `Número incompleto — faltam ${missing} dígitos.`,
        };
    }

    if (number.length > required) {
        return {
            valid: false,
            message: 'Número inválido. Confira o DDD e o número.',
        };
    }

    if (number.length === 11) {
        return {
            valid: true,
            number: number.substring(0, 2) + number.substring(3),
        };
    }

    return { valid: true, number };
}
