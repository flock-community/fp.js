import { compose, domain, pipe } from './fp';
import { divide, gcd, quotient } from './integer';
import { range } from './numbers';
import { reduce, toArray } from './iterable';
const { isInteger } = Number;

export const rat = compose(
  domain(([p, q]) => isInteger(p) && isInteger(q) && q !== 0, 'p: Int, q: Int, q !== 0'),
  ([p, q]) => [
    pipe(
      p,
      quotient(gcd(p)(q)),
    ),
    pipe(
      q,
      quotient(gcd(p)(q)),
    ),
  ],
);

export const add = ([c, d]) => ([a, b]) => rat([a * d + b * c, b * d]);

export const times = ([c, d]) => ([a, b]) => rat([a * c, b * d]);

export const toDecimal = length => ([a, b]) => pipe(
  range(0, length),
  reduce(([decimals, dividend]) => (pipe(
    dividend,
    divide(b),
    ({q, r}) => [[...decimals, q], 10 * (r)],
  )), [[], a]),
  toArray,
  ([decimal]) => decimal,
);
