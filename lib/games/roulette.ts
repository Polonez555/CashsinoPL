import { randomInt } from '../rng';

/**
 * Roulette game logic
 * European roulette (numbers 0-36)
 */

export type RouletteColor = 'red' | 'black' | 'green';
export type RouletteBetType = 'straight' | 'color' | 'even' | 'odd' | 'low' | 'high';

export interface RouletteBet {
  type: RouletteBetType;
  value?: number | string; // For straight bets: 0-36, for color: 'red'/'black'
  amount: number;
}

export interface RouletteResult {
  number: number;
  color: RouletteColor;
  winningBets: RouletteBet[];
  totalPayout: number;
}

// Red numbers in roulette
const RED_NUMBERS = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];

/**
 * Get the color of a roulette number
 * @param number Roulette number (0-36)
 * @returns Color of the number
 */
export function getNumberColor(number: number): RouletteColor {
  if (number === 0) return 'green';
  return RED_NUMBERS.includes(number) ? 'red' : 'black';
}

/**
 * Validate a roulette bet
 * @param bet Bet to validate
 * @returns True if bet is valid, false otherwise
 */
export function validateBet(bet: RouletteBet): boolean {
  if (bet.amount <= 0) return false;

  switch (bet.type) {
    case 'straight':
      return typeof bet.value === 'number' && bet.value >= 0 && bet.value <= 36;
    case 'color':
      return bet.value === 'red' || bet.value === 'black';
    case 'even':
    case 'odd':
    case 'low':
    case 'high':
      return true;
    default:
      return false;
  }
}

/**
 * Spin the roulette wheel
 * @returns Random number between 0 and 36
 */
export function spin(): number {
  return randomInt(0, 37);
}

/**
 * Determine winner and calculate payouts
 * @param winningNumber The number that came up
 * @param bets Array of bets placed
 * @returns Result with winning bets and total payout
 */
export function getWinner(winningNumber: number, bets: RouletteBet[]): RouletteResult {
  const color = getNumberColor(winningNumber);
  const winningBets: RouletteBet[] = [];
  let totalPayout = 0;

  for (const bet of bets) {
    if (!validateBet(bet)) continue;

    let isWinner = false;
    let multiplier = 0;

    switch (bet.type) {
      case 'straight':
        if (bet.value === winningNumber) {
          isWinner = true;
          multiplier = 35; // 35:1 payout
        }
        break;
      case 'color':
        if (bet.value === color) {
          isWinner = true;
          multiplier = 1; // 1:1 payout
        }
        break;
      case 'even':
        if (winningNumber !== 0 && winningNumber % 2 === 0) {
          isWinner = true;
          multiplier = 1;
        }
        break;
      case 'odd':
        if (winningNumber % 2 === 1) {
          isWinner = true;
          multiplier = 1;
        }
        break;
      case 'low':
        if (winningNumber >= 1 && winningNumber <= 18) {
          isWinner = true;
          multiplier = 1;
        }
        break;
      case 'high':
        if (winningNumber >= 19 && winningNumber <= 36) {
          isWinner = true;
          multiplier = 1;
        }
        break;
    }

    if (isWinner) {
      winningBets.push(bet);
      totalPayout += bet.amount * multiplier + bet.amount; // Include original bet
    }
  }

  return {
    number: winningNumber,
    color,
    winningBets,
    totalPayout,
  };
}