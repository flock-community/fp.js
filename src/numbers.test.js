import { naturals, primes } from './numbers';
import { takeWhile, join } from './iterable';
import { pipe } from './fp';

test('naturals', () => {
  expect(
    pipe(
      naturals(),
      takeWhile(it => it < 10),
      join(', '),
    ),
  ).toEqual('0, 1, 2, 3, 4, 5, 6, 7, 8, 9');
});

test('primes', () => {
  expect(
    pipe(
      primes(),
      takeWhile(p => p < 50),
      join(', '),
    ),
  ).toEqual('2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47');
});
