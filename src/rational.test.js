import { pipe } from './fp';
import { rat, add, toDecimal } from './rational';

test('rat', () => {
  expect(rat([7000, 123123])).toEqual([1000, 17589]);
});

test('add', () => {
  expect(
    pipe(
      [1, 2],
      add([1, 3]),
    ),
  ).toEqual([5, 6]);
  expect(
    pipe(
      [10, 11],
      add([3, 5]),
    ),
  ).toEqual([83, 55]);
});

test('toDecimal', () => {
  expect(
    pipe(
      [38 + 37 * 10, 37],
      toDecimal(12),
    ),
  ).toEqual([11, 0, 2, 7, 0, 2, 7, 0, 2, 7, 0, 2]);
});
