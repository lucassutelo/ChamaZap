import ValidateNumber from '../src/screens/Home/functions/ValidateNumber';

describe('ValidateNumber', () => {
    it('asks for the number when empty', () => {
        expect(ValidateNumber('')).toEqual({
            valid: false,
            message: 'Digite o número com DDD.',
        });
    });

    it('counts missing digits for mobile numbers', () => {
        expect(ValidateNumber('119876543')).toEqual({
            valid: false,
            message: 'Número incompleto — faltam 2 dígitos.',
        });
        expect(ValidateNumber('1198765432')).toEqual({
            valid: false,
            message: 'Número incompleto — falta 1 dígito.',
        });
    });

    it('counts missing digits for landlines', () => {
        expect(ValidateNumber('31327411')).toEqual({
            valid: false,
            message: 'Número incompleto — faltam 2 dígitos.',
        });
    });

    it('rejects a DDD starting with zero', () => {
        expect(ValidateNumber('01198765432')).toMatchObject({ valid: false });
    });

    it('rejects 11 digits that are not a mobile number', () => {
        expect(ValidateNumber('31327411900')).toMatchObject({ valid: false });
    });

    it('keeps sending mobile numbers without the ninth digit', () => {
        expect(ValidateNumber('11987654321')).toEqual({
            valid: true,
            number: '1187654321',
        });
    });

    it('accepts landlines as typed', () => {
        expect(ValidateNumber('3132741190')).toEqual({
            valid: true,
            number: '3132741190',
        });
    });
});
