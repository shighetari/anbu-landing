const LCG_A = 1664525;
const LCG_C = 1013904223;
const LCG_M = 2 ** 32;

const normalizeSeed = (value: number) => Math.abs(Math.floor(value)) % LCG_M;

/**
 * Deterministic pseudo-random number generator (0 <= n < 1)
 * derived from a linear congruential generator so SSR/CSR match.
 */
export function deterministicRandom(seed: number) {
  const next = (LCG_A * normalizeSeed(seed) + LCG_C) % LCG_M;
  return next / LCG_M;
}

/**
 * Hash a string into a stable positive number for use as a seed.
 */
export function hashStringToNumber(value: string) {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0; // Convert to 32-bit int
  }
  return Math.abs(hash);
}
