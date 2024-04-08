function cpuIntensiveTask(callback) {
  const primeNumbers = calculatePrimeNumbers(30000);
  callback(`CPU-intensive task completed. Prime numbers: ${primeNumbers.length}`);
}

function calculatePrimeNumbers(limit) {
  const primes = [];
  for (let i = 2; i <= limit; i++) {
      if (isPrime(i)) {
          primes.push(i);
      }
  }
  return primes;
}

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