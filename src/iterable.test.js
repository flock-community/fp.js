import { contains, sequence, take, toArray, unzip, withIndex, zip, length} from './iterable';
import { pipe } from './fp';
import { naturals } from './numbers';

test('', () => {
  expect(
    pipe(
      ['a', 'b', 'c'],
      zip(sequence(0, i => i + 1)),
      toArray,
    ),
  ).toEqual([['a', 0], ['b', 1], ['c', 2]]);

  expect(
    pipe(
      ['a', 'b', 'c'],
      zip(sequence(10, i => i + 1)),
      unzip,
    ),
  ).toEqual([['a', 'b', 'c'], [10, 11, 12]]);

  const array = pipe(
    ['a', 'b', 'c'],
    withIndex,
    toArray,
  );
  expect(
    array,
  ).toEqual([['a', 0], ['b', 1], ['c', 2]]);

  expect(
    pipe(
      ['a', 'b', 'c'],
      length,
    )
  ).toEqual(3);
});
