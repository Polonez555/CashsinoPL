import { shuffle } from '../rng';

/**
 * Blackjack game logic
 * Standard blackjack rules
 */

export type CardSuit = 'hearts' | 'diamonds' | 'clubs' | 'spades';
export type CardRank = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K';

export interface Card {
  suit: CardSuit;
  rank: CardRank;
}

export interface Hand {
  cards: Card[];
  score: number;
  isBusted: boolean;
  isBlackjack: boolean;
}

export interface BlackjackGame {
  playerHand: Hand;
  dealerHand: Hand;
  deck: Card[];
  gameOver: boolean;
  winner: 'player' | 'dealer' | 'push' | null;
}

// Create a standard 52-card deck
function createDeck(): Card[] {
  const suits: CardSuit[] = ['hearts', 'diamonds', 'clubs', 'spades'];
  const ranks: CardRank[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  const deck: Card[] = [];

  for (const suit of suits) {
    for (const rank of ranks) {
      deck.push({ suit, rank });
    }
  }

  return shuffle(deck);
}

/**
 * Calculate the score of a hand
 * @param cards Array of cards in hand
 * @returns Score (aces count as 1 or 11, face cards as 10)
 */
export function calculateScore(cards: Card[]): number {
  let score = 0;
  let aces = 0;

  for (const card of cards) {
    if (card.rank === 'A') {
      aces++;
      score += 11;
    } else if (['K', 'Q', 'J'].includes(card.rank)) {
      score += 10;
    } else {
      score += parseInt(card.rank, 10);
    }
  }

  // Adjust for aces if busted
  while (score > 21 && aces > 0) {
    score -= 10;
    aces--;
  }

  return score;
}

/**
 * Check if a hand is busted (over 21)
 * @param cards Array of cards in hand
 * @returns True if busted, false otherwise
 */
export function bust(cards: Card[]): boolean {
  return calculateScore(cards) > 21;
}

/**
 * Check if a hand is a blackjack (ace + 10-value card, 2 cards only)
 * @param cards Array of cards in hand
 * @returns True if blackjack, false otherwise
 */
export function isBlackjack(cards: Card[]): boolean {
  if (cards.length !== 2) return false;
  
  const hasAce = cards.some(card => card.rank === 'A');
  const hasTen = cards.some(card => ['10', 'J', 'Q', 'K'].includes(card.rank));
  
  return hasAce && hasTen;
}

/**
 * Create a hand object with calculated properties
 * @param cards Array of cards
 * @returns Hand object with score and status
 */
function createHand(cards: Card[]): Hand {
  const score = calculateScore(cards);
  const isBusted = score > 21;
  const isBlackjackHand = isBlackjack(cards);

  return {
    cards,
    score,
    isBusted,
    isBlackjack: isBlackjackHand,
  };
}

/**
 * Deal initial cards to player and dealer
 * @returns New blackjack game with initial hands
 */
export function deal(): BlackjackGame {
  const deck = createDeck();
  
  const playerCards = [deck.pop()!, deck.pop()!];
  const dealerCards = [deck.pop()!, deck.pop()!];

  const playerHand = createHand(playerCards);
  const dealerHand = createHand(dealerCards);

  return {
    playerHand,
    dealerHand,
    deck,
    gameOver: false,
    winner: null,
  };
}

/**
 * Player hits (draws another card)
 * @param game Current game state
 * @returns Updated game state
 */
export function hit(game: BlackjackGame): BlackjackGame {
  if (game.gameOver) {
    throw new Error('Game is already over');
  }

  const newCard = game.deck.pop()!;
  const newPlayerCards = [...game.playerHand.cards, newCard];
  const newPlayerHand = createHand(newPlayerCards);

  let winner: 'player' | 'dealer' | 'push' | null = null;
  let gameOver = false;

  if (newPlayerHand.isBusted) {
    winner = 'dealer';
    gameOver = true;
  }

  return {
    ...game,
    playerHand: newPlayerHand,
    deck: game.deck,
    gameOver,
    winner,
  };
}

/**
 * Player stands (dealer plays)
 * @param game Current game state
 * @returns Updated game state with dealer's turn
 */
export function stand(game: BlackjackGame): BlackjackGame {
  if (game.gameOver) {
    throw new Error('Game is already over');
  }

  let dealerCards = [...game.dealerHand.cards];
  let deck = [...game.deck];

  // Dealer must hit on 16 or less, stand on 17 or more
  while (calculateScore(dealerCards) < 17) {
    dealerCards.push(deck.pop()!);
  }

  const dealerHand = createHand(dealerCards);
  const playerScore = game.playerHand.score;
  const dealerScore = dealerHand.score;

  let winner: 'player' | 'dealer' | 'push' | null = null;

  if (dealerHand.isBusted) {
    winner = 'player';
  } else if (playerScore > dealerScore) {
    winner = 'player';
  } else if (playerScore < dealerScore) {
    winner = 'dealer';
  } else {
    winner = 'push';
  }

  return {
    ...game,
    dealerHand,
    deck,
    gameOver: true,
    winner,
  };
}