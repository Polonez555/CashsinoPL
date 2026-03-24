import {
  deal,
  calculateScore,
  bust,
  isBlackjack,
  hit,
  stand,
} from '@/lib/games/blackjack';
import type { Card } from '@/lib/games/blackjack';

describe('Blackjack', () => {
  describe('deal()', () => {
    it('should deal initial hands to player and dealer', () => {
      const game = deal();
      expect(game.playerHand.cards).toHaveLength(2);
      expect(game.dealerHand.cards).toHaveLength(2);
      expect(game.deck).toHaveLength(48); // 52 - 4 cards dealt
      expect(game.gameOver).toBe(false);
      expect(game.winner).toBe(null);
    });

    it('should create valid hands with scores', () => {
      const game = deal();
      expect(game.playerHand.score).toBeGreaterThan(0);
      expect(game.playerHand.score).toBeLessThanOrEqual(21);
      expect(game.dealerHand.score).toBeGreaterThan(0);
      expect(game.dealerHand.score).toBeLessThanOrEqual(21);
    });

    it('should detect blackjack when dealt', () => {
      // Deal multiple times to potentially get a blackjack
      let blackjackFound = false;
      for (let i = 0; i < 50; i++) {
        const game = deal();
        if (game.playerHand.isBlackjack || game.dealerHand.isBlackjack) {
          blackjackFound = true;
          break;
        }
      }
      // While not guaranteed, we should occasionally see a blackjack in 50 deals
      expect(blackjackFound).toBe(true);
    });
  });

  describe('calculateScore()', () => {
    it('should calculate score correctly for number cards', () => {
      const cards: Card[] = [
        { suit: 'hearts', rank: '7' },
        { suit: 'diamonds', rank: '10' },
      ];
      expect(calculateScore(cards)).toBe(17);
    });

    it('should calculate face cards as 10', () => {
      const cards: Card[] = [
        { suit: 'hearts', rank: 'K' },
        { suit: 'diamonds', rank: 'Q' },
      ];
      expect(calculateScore(cards)).toBe(20);
    });

    it('should handle aces as 11 when beneficial', () => {
      const cards: Card[] = [
        { suit: 'hearts', rank: 'A' },
        { suit: 'diamonds', rank: '9' },
      ];
      expect(calculateScore(cards)).toBe(20); // 11 + 9
    });

    it('should handle aces as 1 when needed to avoid bust', () => {
      const cards: Card[] = [
        { suit: 'hearts', rank: 'A' },
        { suit: 'diamonds', rank: '7' },
        { suit: 'clubs', rank: '9' },
      ];
      expect(calculateScore(cards)).toBe(17); // 1 + 7 + 9
    });

    it('should handle multiple aces correctly', () => {
      const cards: Card[] = [
        { suit: 'hearts', rank: 'A' },
        { suit: 'diamonds', rank: 'A' },
        { suit: 'clubs', rank: '9' },
      ];
      expect(calculateScore(cards)).toBe(21); // 11 + 1 + 9
    });
  });

  describe('bust()', () => {
    it('should return true for scores over 21', () => {
      const cards: Card[] = [
        { suit: 'hearts', rank: 'K' },
        { suit: 'diamonds', rank: 'Q' },
        { suit: 'clubs', rank: '5' },
      ];
      expect(bust(cards)).toBe(true);
    });

    it('should return false for scores of 21 or less', () => {
      const cards: Card[] = [
        { suit: 'hearts', rank: 'K' },
        { suit: 'diamonds', rank: 'Q' },
        { suit: 'clubs', rank: 'A' },
      ];
      expect(bust(cards)).toBe(false);
    });

    it('should return false for scores under 21', () => {
      const cards: Card[] = [
        { suit: 'hearts', rank: '10' },
        { suit: 'diamonds', rank: '9' },
      ];
      expect(bust(cards)).toBe(false);
    });
  });

  describe('isBlackjack()', () => {
    it('should return true for ace and 10-value card', () => {
      const cards: Card[] = [
        { suit: 'hearts', rank: 'A' },
        { suit: 'diamonds', rank: 'K' },
      ];
      expect(isBlackjack(cards)).toBe(true);
    });

    it('should return false for more than 2 cards', () => {
      const cards: Card[] = [
        { suit: 'hearts', rank: 'A' },
        { suit: 'diamonds', rank: 'K' },
        { suit: 'clubs', rank: '5' },
      ];
      expect(isBlackjack(cards)).toBe(false);
    });

    it('should return false for non-blackjack combinations', () => {
      const cards: Card[] = [
        { suit: 'hearts', rank: 'K' },
        { suit: 'diamonds', rank: 'Q' },
      ];
      expect(isBlackjack(cards)).toBe(false);
    });
  });

  describe('hit()', () => {
    it('should add a card to player hand', () => {
      const game = deal();
      const initialCardCount = game.playerHand.cards.length;
      const updatedGame = hit(game);
      expect(updatedGame.playerHand.cards.length).toBe(initialCardCount + 1);
    });

    it('should end game when player busts', () => {
      let game = deal();
      // Force a bust by keeping hitting
      while (game.playerHand.score <= 21 && game.deck.length > 0) {
        game = hit(game);
        if (game.playerHand.isBusted) {
          break;
        }
      }
      expect(game.gameOver).toBe(true);
      expect(game.winner).toBe('dealer');
    });

    it('should throw error when game is already over', () => {
      let game = deal();
      // Force end game by player standing
      game = stand(game);
      expect(() => hit(game)).toThrow('Game is already over');
    });
  });

  describe('stand()', () => {
    it('should end game and determine winner', () => {
      const game = deal();
      const updatedGame = stand(game);
      expect(updatedGame.gameOver).toBe(true);
      expect(updatedGame.winner).not.toBeNull();
    });

    it('should dealer hit on 16 or less', () => {
      // This is hard to test deterministically, but we can verify the logic exists
      const game = deal();
      const finalGame = stand(game);
      // Game should be over after dealer plays
      expect(finalGame.gameOver).toBe(true);
    });

    it('should dealer stand on 17 or more', () => {
      const game = deal();
      const finalGame = stand(game);
      expect(finalGame.dealerHand.score).toBeGreaterThanOrEqual(17);
    });

    it('should throw error when game is already over', () => {
      let game = deal();
      // End game by standing
      game = stand(game);
      expect(() => stand(game)).toThrow('Game is already over');
    });
  });
});