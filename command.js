/**
 * Executes a CPU-intensive task of calculating prime numbers and calls a callback function when done.
 * @param {Function} callback - The callback function to be called when the task is completed.
 */
function cpuIntensiveTask(callback) {
  const primeNumbers = calculatePrimeNumbers(30000);
  callback(`CPU-intensive task completed. Prime numbers: ${primeNumbers.length}`);
}

/**
 * Calculates prime numbers up to a given limit.
 * @param {number} limit - The upper limit for the prime numbers calculation.
 * @returns {Array} An array of prime numbers up to the given limit.
 */
function calculatePrimeNumbers(limit) {
  const primes = [];
  for (let i = 2; i <= limit; i++) {
      if (isPrime(i)) {
          primes.push(i);
      }
  }
  return primes;
}

/**
 * Checks if a given number is prime.
 * @param {number} num - The number to check.
 * @returns {boolean} True if the number is prime, false otherwise.
 */
function isPrime(num) {
  for (let i = 2, sqrt = Math.sqrt(num); i <= sqrt; i++) {
     if (num % i === 0) {
        return false;
     }
  }
  return num > 1;
}

exports.calculatePrimeNumbers = calculatePrimeNumbers;
exports.isPrime = isPrime;