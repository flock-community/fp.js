import { also, pipe } from './fp';
import { rat, add, toDecimal, toDecimalWithRemainders, toDecimalWithRemainders2 } from './rational';
import {
  toArray,
  join,
  map,
  takeWhile,
  take,
  inject,
  reduce,
  toSet,
  endWhen,
  filter, sequence,
} from './iterable';
import { overline } from './string';
import { last } from './array';
import { range } from './numbers';

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

test('toDecimalWithRemainders', () => {

  pipe(
    sequence(0, it => it + 1),
    take(10),
    toArray,
    console.log
  );

  const data = [
    [[1, 2], '0.5'],
    [[1, 3], '0.̅3'],
    [[1, 4], '0.25'],
    [[1, 5], '0.2'],
    [[1, 6], '0.̅1̅6'],
    [[1, 7], '0.̅1̅4̅2̅8̅5̅7'],
    [[1, 8], '0.125'],
    [[1, 9], '0.̅1'],
    [[1, 10], '0.125'],
    [[1, 11], '0.125'],
  ];

  data.map(([rational, decimal]) => {
    expect(
      pipe(
        [1, 7],
        toDecimalWithRemainders,
        inject(
          { decimals: [], remainders: [] },
          ({ decimals, remainders }, { decimal, remainder }) => ({
            decimals: [...decimals, decimal],
            remainders: [...remainders, remainder],
          }),
        ),
        endWhen(({decimals, remainders}) => remainders.length > toSet(remainders).size),
        toArray,
        last,
        // last,
        // join('\n'),
      ),
    ).toEqual(decimal);
  });
});

test('toDecimal', () => {
  const data = [
    [[1, 2], '0.5'],
    [[1, 3], '0.̅3'],
    [[1, 4], '0.25'],
    [[1, 5], '0.2'],
    [[1, 6], '0.̅1̅6'],
    [[1, 7], '0.̅1̅4̅2̅8̅5̅7'],
    [[1, 8], '0.125'],
    [[1, 9], '0.̅1'],
    [[1, 10], '0.125'],
    [[1, 11], '0.125'],
  ];

  data.map(([rational, decimal]) => {
    expect(
      pipe(
        rational,
        toDecimal,
      ),
    ).toEqual(decimal);
  });
});
