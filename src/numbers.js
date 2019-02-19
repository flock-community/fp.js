import { pipe } from './fp';
import { every, filter, takeWhile } from './iterable';

// More elegant, but very slow because of lack of tail call optimization.
export function* naturalsRecursive(start = 0) {
  yield start;
  yield* naturals(start + 1);
}

export function* naturals(start = 0) {
  while (true) {
    yield start++;
  }
}

export const isPrime = p =>
  pipe(
    naturals(2),
    takeWhile(n => n ** 2 <= p),
    every(n => p % n !== 0),
  );

export const primes = () => pipe(
  naturals(2),
  filter(n => isPrime(n)),
);