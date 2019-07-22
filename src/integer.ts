import { integers } from './numbers';
import { first, map } from './iterable';
import { compose, curry, equals, pipe } from './fp';

export const add = (b: number) => (a: number) => a + b;
export const times = b => a => a * b;

export const divide = curry((a, b) =>
  pipe(
    integers(),
    map(q => ({ q, r: a - q * b })),
    first(({ q, r }) => r >= 0 && r < b),
  ),
);

export const quotient = b =>
  compose(
    divide(b),
    ({ q }) => q,
  );

export const mod = b =>
  compose(
    divide(b),
    ({ q, r }) => r,
  );

export const isDivisibleBy = b =>
  compose(
    mod(b),
    equals(0),
  );

export const divides = b => a => isDivisibleBy(a)(b);

export const gcd = b => a => (b === 0 ? a : gcd(mod(b)(a))(b));

export const lcm = a => b => (a * b) / gcd(a)(b);
