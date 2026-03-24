import { spin, getWinner } from '@/lib/games/roulette';
import { deal } from '@/lib/games/blackjack';

describe('API Integration Tests', () => {
  describe('Roulette Integration', () => {
    it('should process a complete roulette spin', () => {
      const bet = {
        type: 'straight' as const,
        value: 17,
        amount: 10,
      };

      const number = spin();
      const result = getWinner(number, [bet]);
      
      expect(result).toHaveProperty('number');
      expect(result).toHaveProperty('winningBets');
      expect(result).toHaveProperty('totalPayout');
      expect(result.number).toBe(number);
      expect(Array.isArray(result.winningBets)).toBe(true);
      expect(typeof result.totalPayout).toBe('number');
    });

    it('should handle invalid roulette input gracefully', () => {
      const invalidBet = {
        type: 'invalid_type' as any,
        amount: -10,
      };

      // Should handle without throwing
      expect(() => {
        const number = spin();
        const result = getWinner(number, [invalidBet]);
      }).not.toThrow();
    });

    it('should process color bets correctly', () => {
      const bet = {
        type: 'color' as const,
        value: 'red' as const,
        amount: 10,
      };

      const number = spin();
      const result = getWinner(number, [bet]);
      
      expect(result).toHaveProperty('number');
      expect(result).toHaveProperty('totalPayout');
      expect(result.totalPayout).toBeGreaterThanOrEqual(0);
    });

    it('should process multiple bets at once', () => {
      const bets = [
        { type: 'even' as const, amount: 10 },
        { type: 'color' as const, value: 'red' as const, amount: 5 },
      ];

      const number = spin();
      const result = getWinner(number, bets);
      
      expect(result).toHaveProperty('winningBets');
      expect(Array.isArray(result.winningBets)).toBe(true);
    });
  });

  describe('Blackjack Integration', () => {
    it('should deal a complete game', () => {
      const game = deal();
      
      expect(game).toHaveProperty('playerHand');
      expect(game).toHaveProperty('dealerHand');
      expect(game).toHaveProperty('deck');
      expect(game).toHaveProperty('gameOver');
      expect(game.playerHand).toHaveProperty('cards');
      expect(game.playerHand).toHaveProperty('score');
      expect(game.playerHand.cards).toHaveLength(2);
      expect(game.dealerHand.cards).toHaveLength(2);
      expect(game.deck).toHaveLength(48);
      expect(game.gameOver).toBe(false);
    });

    it('should calculate valid scores for both hands', () => {
      const game = deal();
      
      expect(game.playerHand.score).toBeGreaterThan(0);
      expect(game.playerHand.score).toBeLessThanOrEqual(21);
      expect(game.dealerHand.score).toBeGreaterThan(0);
      expect(game.dealerHand.score).toBeLessThanOrEqual(21);
    });

    it('should have valid card distributions', () => {
      const game = deal();
      const allCards = [
        ...game.playerHand.cards,
        ...game.dealerHand.cards,
        ...game.deck,
      ];
      
      // Should have 52 unique cards total
      const uniqueCards = new Set(allCards.map((c) => `${c.suit}-${c.rank}`));
      expect(uniqueCards.size).toBe(52);
    });

    it('should handle game state transitions', () => {
      let game = deal();
      expect(game.gameOver).toBe(false);
      
      // Game should be playable from the initial deal
      expect(game.playerHand.score).toBeGreaterThan(0);
      expect(game.dealerHand.score).toBeGreaterThan(0);
    });
  });
});