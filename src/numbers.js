import { compose, not, pipe } from './fp';
import { every, expand, filter, sequence, takeWhile, map } from './iterable';
import { divides } from './integer';

// More elegant but very slow because of lack of tail call optimization.
export function* naturalsRecursive(start = 0) {
  yield start;
  yield* naturalsRecursive(start + 1);
}

export const naturals = (start = 0) => sequence(start, i => i + 1);

export const fibonacci = () =>
  pipe(
    sequence([0, 1], ([a, b]) => [b, a + b]),
    map(it => it[1]),
  );

export function* integers() {
  yield 0;
  yield* pipe(
    naturals(1),
    expand(n => [n, -n]),
  );
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

export const range = (start, end) =>
  pipe(
    naturals(start),
    takeWhile(n => n < end),
  );
