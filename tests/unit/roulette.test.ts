import {
  spin,
  getWinner,
  validateBet,
  getNumberColor,
} from '@/lib/games/roulette';
import type { RouletteBet } from '@/lib/games/roulette';

describe('Roulette', () => {
  describe('spin()', () => {
    it('should return a number between 0 and 36', () => {
      const result = spin();
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThanOrEqual(36);
      expect(Number.isInteger(result)).toBe(true);
    });

    it('should return different values on multiple spins (statistical test)', () => {
      const results = new Set<number>();
      for (let i = 0; i < 100; i++) {
        results.add(spin());
      }
      // With 100 spins, we should get multiple different values
      expect(results.size).toBeGreaterThan(10);
    });
  });

  describe('validateBet()', () => {
    it('should validate a valid straight bet', () => {
      const bet: RouletteBet = {
        type: 'straight',
        value: 17,
        amount: 10,
      };
      expect(validateBet(bet)).toBe(true);
    });

    it('should reject a straight bet with invalid number', () => {
      const bet: RouletteBet = {
        type: 'straight',
        value: 37,
        amount: 10,
      };
      expect(validateBet(bet)).toBe(false);
    });

    it('should validate a valid color bet', () => {
      const bet: RouletteBet = {
        type: 'color',
        value: 'red',
        amount: 10,
      };
      expect(validateBet(bet)).toBe(true);
    });

    it('should reject bet with zero or negative amount', () => {
      const bet: RouletteBet = {
        type: 'color',
        value: 'red',
        amount: 0,
      };
      expect(validateBet(bet)).toBe(false);
    });

    it('should validate even/odd/low/high bets', () => {
      const evenBet: RouletteBet = { type: 'even', amount: 10 };
      const oddBet: RouletteBet = { type: 'odd', amount: 10 };
      const lowBet: RouletteBet = { type: 'low', amount: 10 };
      const highBet: RouletteBet = { type: 'high', amount: 10 };

      expect(validateBet(evenBet)).toBe(true);
      expect(validateBet(oddBet)).toBe(true);
      expect(validateBet(lowBet)).toBe(true);
      expect(validateBet(highBet)).toBe(true);
    });
  });

  describe('getWinner()', () => {
    it('should calculate correct payout for winning straight bet', () => {
      const bets: RouletteBet[] = [
        {
          type: 'straight',
          value: 17,
          amount: 10,
        },
      ];
      const result = getWinner(17, bets);
      expect(result.number).toBe(17);
      expect(result.winningBets).toHaveLength(1);
      expect(result.totalPayout).toBe(360); // 10 * 35 + 10 (original bet)
    });

    it('should return no winners for losing bets', () => {
      const bets: RouletteBet[] = [
        {
          type: 'straight',
          value: 17,
          amount: 10,
        },
      ];
      const result = getWinner(0, bets);
      expect(result.winningBets).toHaveLength(0);
      expect(result.totalPayout).toBe(0);
    });

    it('should correctly calculate color bet winnings', () => {
      const bets: RouletteBet[] = [
        {
          type: 'color',
          value: 'red',
          amount: 10,
        },
      ];
      const result = getWinner(1, bets); // 1 is red
      expect(result.winningBets).toHaveLength(1);
      expect(result.totalPayout).toBe(20); // 10 * 1 + 10 (original bet)
    });

    it('should correctly calculate even/odd bet winnings', () => {
      const bets: RouletteBet[] = [
        {
          type: 'even',
          amount: 10,
        },
        {
          type: 'odd',
          amount: 10,
        },
      ];
      const result = getWinner(2, bets); // 2 is even
      expect(result.winningBets).toHaveLength(1);
      expect(result.totalPayout).toBe(20);
    });
  });

  describe('getNumberColor()', () => {
    it('should return green for 0', () => {
      expect(getNumberColor(0)).toBe('green');
    });

    it('should return red for red numbers', () => {
      expect(getNumberColor(1)).toBe('red');
      expect(getNumberColor(3)).toBe('red');
      expect(getNumberColor(36)).toBe('red');
    });

    it('should return black for black numbers', () => {
      expect(getNumberColor(2)).toBe('black');
      expect(getNumberColor(4)).toBe('black');
      expect(getNumberColor(35)).toBe('black');
    });
  });
});