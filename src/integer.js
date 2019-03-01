import { naturals } from './numbers';
import { first, map, takeWhile, filter, last, toArray } from './iterable';
import { also, and, pipe } from './fp';

export const add = b => a => a + b;
export const times = b => a => a * b;

export const divide = b => a =>
  pipe(
    naturals(),
    map(q => ({ q, r: a - q * b })),
    first(({ q, r }) => r < b),
  );

export const divides = b => a =>
  pipe(
    b,
    divide(a),
    ({ q, r }) => r === 0,
  );
