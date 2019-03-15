import {
  contains,
  sequence,
  take,
  toArray,
  unzip,
  withIndex,
  zip,
  length,
  join,
  skipWhile,
  skip,
  takeWhile,
} from './iterable';
import { pipe } from './fp';
import { naturals } from './numbers';

test('map', () => {

});

test('take', () => {
  expect(
    pipe(
      '1234',
      take(2),
      join(''),
    ),
  ).toEqual('12');
});

test('skip', () => {
  expect(
    pipe(
      '1234',
      skip(2),
      join(''),
    ),
  ).toEqual('34');
});


test('skipWhile', () => {
  expect(
    pipe(
      naturals(),
      skipWhile(n => n < 2),
      takeWhile(n => n < 10),
      join(''),
    ),
  ).toEqual('34');
});
