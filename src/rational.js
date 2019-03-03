import { also, compose, domain, equals, pipe } from './fp';
import { divide, gcd, mod, quotient } from './integer';
import { naturals, range } from './numbers';
import { fold, inject, reduce, sequence, takeWhile, toArray, toSet , map} from './iterable';
import { last } from './array';
import { overline } from './string';
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

// export const toDecimal = length => ([a, b]) => pipe(
//   range(0, length),
//   reduce(([decimals, dividend]) => (pipe(
//     dividend,
//     divide(b),
//     ({q, r}) => [[...decimals, q], 10 * (r)],
//   )), [[], a]),
//   toArray,
//   ([decimal]) => decimal,
// );

export function* toDecimalWithRemainders([a, b]) {
  let dividend = a;
  while (true) {
    const { q, r } = divide(dividend, b);
    yield {decimal: q, remainder: r};
    dividend = 10 * r;
  }
}

export function toDecimal([a, b]) {
  let decimals = [];
  let repetend = null;

  let remainders = [];

  let { q, r } = divide(a, b);
  const quotient = q;
  let dividend = 10 * r;

  while (true) {
    ({ q, r } = divide(dividend, b));
    dividend = 10 * r;

    if (remainders.includes(dividend)) {
      repetend = decimals.splice(remainders.indexOf(dividend));
      break;
    }
    decimals.push(q);

    remainders.push(dividend);
    if (r === 0) {
      break;
    }
  }

  return `${quotient}.${decimals.join('')}${repetend ? overline(repetend) : ''}`;
}
