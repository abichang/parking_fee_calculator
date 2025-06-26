import { calculate } from './ParkingFeeCalculator';

describe('calculate parking fee', () => {
    it('15 mins free', () => {

        const start = new Date('2024-01-02T00:00:00');
        const end = new Date('2024-01-02T00:15:00');

        const actual = calculate(start, end);

        expect(actual).toBe(0);
    });

    it('over 15 mins NOT free', () => {

        const start = new Date('2024-01-02T00:00:00');
        const end = new Date('2024-01-02T00:15:01');

        const actual = calculate(start, end);

        expect(actual).toBe(30);
    });

    it('over 30 mins then pay 60', () => {

        const start = new Date('2024-01-02T00:00:00');
        const end = new Date('2024-01-02T00:30:01');

        const actual = calculate(start, end);

        expect(actual).toBe(60);
    });

    it('over 60 mins then pay 90', () => {

        const start = new Date('2024-01-02T00:00:00');
        const end = new Date('2024-01-02T01:00:01');

        const actual = calculate(start, end);

        expect(actual).toBe(90);
    });

    it('over 150 mins then pay 150', () => {

        const start = new Date('2024-01-02T00:00:00');
        const end = new Date('2024-01-02T02:30:01');

        const actual = calculate(start, end);

        expect(actual).toBe(150);
    });

    it('two whole days', () => {

        const start = new Date('2024-01-02T00:00:00');
        const end = new Date('2024-01-04T00:00:00');

        const actual = calculate(start, end);

        expect(actual).toBe(150 + 150);
    });


    it('partial day then whole day', () => {

        const start = new Date('2024-01-02T23:50:00');
        const end = new Date('2024-01-04T00:00:00');

        const actual = calculate(start, end);

        expect(actual).toBe(30 + 150);
    });

    it('whole day then partial day', () => {

        const start = new Date('2024-01-02T00:00:00');
        const end = new Date('2024-01-03T00:10:00');

        const actual = calculate(start, end);

        expect(actual).toBe(150 + 30);
    });

    it('Saturday pay 50 per half hour', () => {

        const start = new Date('2024-01-06T00:00:00');
        const end = new Date('2024-01-06T00:15:01');

        const actual = calculate(start, end);

        expect(actual).toBe(50);
    });

    it('Sunday pay 50 per half hour', () => {

        const start = new Date('2024-01-07T00:00:00');
        const end = new Date('2024-01-07T00:15:01');

        const actual = calculate(start, end);

        expect(actual).toBe(50);
    });

    it('Saturday daily limit is 2400', () => {

        const start = new Date('2024-01-06T00:00:00');
        const end = new Date('2024-01-07T00:00:00');

        const actual = calculate(start, end);

        expect(actual).toBe(2400);
    });

    it('National holiday pay 50 per half hour', () => {

        const start = new Date('2024-01-01T00:00:00');
        const end = new Date('2024-01-01T00:15:01');

        const actual = calculate(start, end);

        expect(actual).toBe(50);
    });
});