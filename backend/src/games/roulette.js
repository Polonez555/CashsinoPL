const RED_NUMBERS = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
const BLACK_NUMBERS = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35];

function getColor(number) {
  if (number === 0) return 'green';
  if (RED_NUMBERS.includes(number)) return 'red';
  return 'black';
}

function spin() {
  const number = Math.floor(Math.random() * 37); // 0–36
  const color = getColor(number);
  const parity = number === 0 ? null : number % 2 === 0 ? 'even' : 'odd';
  const range = number === 0 ? null : number <= 18 ? 'low' : 'high';

  return { number, color, parity, range };
}

function evaluateBet(result, bet) {
  const { number, color, parity, range } = result;
  const { type, value, amount } = bet;

  let multiplier = 0;

  switch (type) {
    case 'straight':
      if (parseInt(value) === number) multiplier = 35;
      break;
    case 'color':
      if (value === color) multiplier = 1;
      break;
    case 'parity':
      if (value === parity) multiplier = 1;
      break;
    case 'range':
      if (value === range) multiplier = 1;
      break;
    default:
      throw new Error(`Unknown bet type: ${type}`);
  }

  return {
    won: multiplier > 0,
    payout: multiplier > 0 ? amount * (multiplier + 1) : 0,
    profit: multiplier > 0 ? amount * multiplier : -amount,
  };
}

module.exports = { spin, evaluateBet, getColor, RED_NUMBERS, BLACK_NUMBERS };
