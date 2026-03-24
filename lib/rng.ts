import * as crypto from 'crypto';

/**
 * Cryptographically secure random number generator
 * Uses Node.js crypto module for secure random generation
 */

/**
 * Generate a random integer between min (inclusive) and max (exclusive)
 * @param min Minimum value (inclusive)
 * @param max Maximum value (exclusive)
 * @returns Random integer in range [min, max)
 */
export function randomInt(min: number, max: number): number {
  const range = max - min;
  const bytes = crypto.randomBytes(4);
  const randomValue = bytes.readUInt32BE(0) / 0xFFFFFFFF;
  return Math.floor(randomValue * range) + min;
}

/**
 * Generate a random float between min (inclusive) and max (exclusive)
 * @param min Minimum value (inclusive)
 * @param max Maximum value (exclusive)
 * @returns Random float in range [min, max)
 */
export function randomFloat(min: number, max: number): number {
  const range = max - min;
  const bytes = crypto.randomBytes(8);
  const randomValue = bytes.readBigUInt64BE(0) / BigInt(0xFFFFFFFFFFFFFFFF);
  return Number(randomValue) * range + min;
}

/**
 * Shuffle an array using Fisher-Yates algorithm with crypto-secure RNG
 * @param array Array to shuffle
 * @returns New shuffled array
 */
export function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = randomInt(0, i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Generate a random boolean value
 * @returns Random true or false
 */
export function randomBoolean(): boolean {
  return randomInt(0, 2) === 0;
}

/**
 * Pick a random element from an array
 * @param array Array to pick from
 * @returns Random element from array
 */
export function pickRandom<T>(array: T[]): T {
  if (array.length === 0) {
    throw new Error('Cannot pick from empty array');
  }
  return array[randomInt(0, array.length)];
}