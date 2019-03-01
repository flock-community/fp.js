import { pipe } from './fp';
import { divide, divides, gcd } from './integer';

test('divide', () => {
  expect(
    pipe(
      20,
      divide(3),
    ),
  ).toEqual({
    q: 6,
    r: 2,
  });

  expect(
    pipe(
      -27,
      divide(6),
    ),
  ).toEqual({
    q: -5,
    r: 3,
  });

  expect(
    pipe(
      20,
      divide(4),
    ),
  ).toEqual({
    q: 5,
    r: 0,
  });
});

test('divides', () => {
  expect(
    pipe(
      3,
      divides(20),
    ),
  ).toEqual(false);

  expect(
    pipe(
      4,
      divides(20),
    ),
  ).toEqual(true);
});

test('gcd', () => {
  expect(
    pipe(
      20,
      gcd(10),
    ),
  ).toEqual(10);
});
