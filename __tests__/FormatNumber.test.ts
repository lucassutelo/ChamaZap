import {
    formatNumber,
    normalizeNumber,
} from '../src/screens/Home/functions/FormatNumber';

describe('formatNumber', () => {
    it.each([
        ['', ''],
        ['1', '(1'],
        ['11', '(11'],
        ['119', '(11) 9'],
        ['1198765', '(11) 98765'],
        ['11987654', '(11) 98765-4'],
        ['11987654321', '(11) 98765-4321'],
        ['3132741190', '(31) 3274-1190'],
    ])('%s → %s', (digits, formatted) => {
        expect(formatNumber(digits)).toBe(formatted);
    });
});

describe('normalizeNumber', () => {
    it('keeps only digits while typing', () => {
        expect(normalizeNumber('(11) 98765-4', '1198765')).toBe('11987654');
    });

    it('limits typing to 11 digits', () => {
        expect(normalizeNumber('(11) 98765-43210', '11987654321')).toBe(
            '11987654321',
        );
    });

    it('keeps DDD 55 when typed digit by digit', () => {
        expect(normalizeNumber('(55) 99999-88887', '55999998888')).toBe(
            '55999998888',
        );
    });

    it.each([
        ['+55 11 98765-4321', '11987654321'],
        ['+55 (55) 99999-8888', '55999998888'],
        ['(011) 98765-4321', '11987654321'],
        ['11 98765-4321', '11987654321'],
        ['31 3274-1190', '3132741190'],
    ])('normalizes pasted %s', (pasted, digits) => {
        expect(normalizeNumber(pasted, '')).toBe(digits);
    });
});
