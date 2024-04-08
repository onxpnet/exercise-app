const { calculatePrimeNumbers, isPrime } = require('./command'); // assuming the functions are exported from index.js

describe('calculatePrimeNumbers', () => {
  test('should return an array of prime numbers up to the limit', () => {
    const primes = calculatePrimeNumbers(10);
    expect(primes).toEqual([2, 3, 5, 7]);
  });

  test('should return an empty array when limit is less than 2', () => {
    const primes = calculatePrimeNumbers(1);
    expect(primes).toEqual([]);
  });
});

describe('isPrime', () => {
  test('should return true for prime numbers', () => {
    expect(isPrime(2)).toBe(true);
    expect(isPrime(3)).toBe(true);
    expect(isPrime(5)).toBe(true);
    expect(isPrime(7)).toBe(true);
  });

  test('should return false for non-prime numbers', () => {
    expect(isPrime(1)).toBe(false);
    expect(isPrime(4)).toBe(false);
    expect(isPrime(6)).toBe(false);
    expect(isPrime(8)).toBe(false);
  });
});