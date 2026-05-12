const { spin, evaluateBet, getColor, getDozen, getColumn, RED_NUMBERS, BLACK_NUMBERS } = require('../../src/games/roulette');

describe('getColor', () => {
  test('returns green for 0', () => {
    expect(getColor(0)).toBe('green');
  });

  test('returns red for all red numbers', () => {
    RED_NUMBERS.forEach(n => expect(getColor(n)).toBe('red'));
  });

  test('returns black for all black numbers', () => {
    BLACK_NUMBERS.forEach(n => expect(getColor(n)).toBe('black'));
  });
});

describe('spin', () => {
  test('returns a number between 0 and 36', () => {
    for (let i = 0; i < 200; i++) {
      const { number } = spin();
      expect(number).toBeGreaterThanOrEqual(0);
      expect(number).toBeLessThanOrEqual(36);
    }
  });

  test('result has all required fields', () => {
    const result = spin();
    expect(result).toHaveProperty('number');
    expect(result).toHaveProperty('color');
    expect(result).toHaveProperty('parity');
    expect(result).toHaveProperty('range');
  });

  test('parity and range are null when number is 0', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0);
    const result = spin();
    expect(result.number).toBe(0);
    expect(result.color).toBe('green');
    expect(result.parity).toBeNull();
    expect(result.range).toBeNull();
    jest.restoreAllMocks();
  });

  test('parity is odd for number 7', () => {
    // Math.random returns 7/37 to hit 7
    jest.spyOn(Math, 'random').mockReturnValue(7 / 37);
    const result = spin();
    expect(result.number).toBe(7);
    expect(result.parity).toBe('odd');
    expect(result.range).toBe('low');
    jest.restoreAllMocks();
  });
});

describe('evaluateBet', () => {
  const result = { number: 7, color: 'red', parity: 'odd', range: 'low', dozen: 1, column: 1 };

  test('straight bet wins on correct number with 35x payout', () => {
    const outcome = evaluateBet(result, { type: 'straight', value: 7, amount: 10 });
    expect(outcome.won).toBe(true);
    expect(outcome.payout).toBe(360);
    expect(outcome.profit).toBe(350);
  });

  test('straight bet loses on wrong number', () => {
    const outcome = evaluateBet(result, { type: 'straight', value: 5, amount: 10 });
    expect(outcome.won).toBe(false);
    expect(outcome.profit).toBe(-10);
    expect(outcome.payout).toBe(0);
  });

  test('color bet wins when color matches', () => {
    const outcome = evaluateBet(result, { type: 'color', value: 'red', amount: 20 });
    expect(outcome.won).toBe(true);
    expect(outcome.payout).toBe(40);
  });

  test('color bet loses when color does not match', () => {
    const outcome = evaluateBet(result, { type: 'color', value: 'black', amount: 20 });
    expect(outcome.won).toBe(false);
  });

  test('parity bet wins on odd', () => {
    const outcome = evaluateBet(result, { type: 'parity', value: 'odd', amount: 50 });
    expect(outcome.won).toBe(true);
    expect(outcome.payout).toBe(100);
  });

  test('range bet wins on low', () => {
    const outcome = evaluateBet(result, { type: 'range', value: 'low', amount: 30 });
    expect(outcome.won).toBe(true);
  });

  test('dozen bet wins (7 is in 1st dozen)', () => {
    const outcome = evaluateBet(result, { type: 'dozen', value: 1, amount: 10 });
    expect(outcome.won).toBe(true);
    expect(outcome.payout).toBe(30);
    expect(outcome.profit).toBe(20);
  });

  test('dozen bet loses on wrong dozen', () => {
    const outcome = evaluateBet(result, { type: 'dozen', value: 2, amount: 10 });
    expect(outcome.won).toBe(false);
    expect(outcome.profit).toBe(-10);
  });

  test('column bet wins (7 is in column 1)', () => {
    const outcome = evaluateBet(result, { type: 'column', value: 1, amount: 10 });
    expect(outcome.won).toBe(true);
    expect(outcome.payout).toBe(30);
  });

  test('column bet loses on wrong column', () => {
    const outcome = evaluateBet(result, { type: 'column', value: 2, amount: 10 });
    expect(outcome.won).toBe(false);
  });

  test('throws on unknown bet type', () => {
    expect(() => evaluateBet(result, { type: 'unknown', value: 'x', amount: 10 })).toThrow('Unknown bet type');
  });
});

describe('getDozen', () => {
  test('returns null for 0', () => { expect(getDozen(0)).toBeNull(); });
  test('returns 1 for numbers 1-12', () => {
    for (let i = 1; i <= 12; i++) expect(getDozen(i)).toBe(1);
  });
  test('returns 2 for numbers 13-24', () => {
    for (let i = 13; i <= 24; i++) expect(getDozen(i)).toBe(2);
  });
  test('returns 3 for numbers 25-36', () => {
    for (let i = 25; i <= 36; i++) expect(getDozen(i)).toBe(3);
  });
});

describe('getColumn', () => {
  test('returns null for 0', () => { expect(getColumn(0)).toBeNull(); });
  test('column 1: 1,4,7,10,...,34', () => {
    [1,4,7,10,13,16,19,22,25,28,31,34].forEach(n => expect(getColumn(n)).toBe(1));
  });
  test('column 2: 2,5,8,11,...,35', () => {
    [2,5,8,11,14,17,20,23,26,29,32,35].forEach(n => expect(getColumn(n)).toBe(2));
  });
  test('column 3: 3,6,9,12,...,36', () => {
    [3,6,9,12,15,18,21,24,27,30,33,36].forEach(n => expect(getColumn(n)).toBe(3));
  });
});
