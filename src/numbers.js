import { compose, not, pipe } from './fp';
import { every, expand, filter, sequence, takeWhile, map, startWhen, skip } from './iterable';
import { divides } from './integer';

export const naturals = () => sequence(1, i => i + 1);

export const fibonacci = () =>
  pipe(
    sequence([0, 1], ([a, b]) => [b, a + b]),
    map(it => it[1]),
  );

export function* integers() {
  yield 0;
  yield* pipe(
    naturals(),
    expand(n => [n, -n]),
  );
}

export const isPrime = p =>
  pipe(
    naturals(),
    startWhen(n => n > 1),
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
