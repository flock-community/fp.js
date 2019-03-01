import { not, pipe } from './fp';
import { every, filter, takeWhile } from './iterable';
import { divides } from './integer';

// More elegant but very slow because of lack of tail call optimization.
export function* naturalsRecursive(start = 0) {
  yield start;
  yield* naturals(start + 1);
}

export function* naturals(start = 0) {
  while (true) yield start++;
}

export const isPrime = p =>
  pipe(
    naturals(2),
    takeWhile(n => n < p),
    every(not(divides(p))),
  );

export const primes = () =>
  pipe(
    naturals(2),
    filter(isPrime),
  );
