import { contains, sequence, take, toArray } from './iterable';
import { pipe } from './fp';

test('', () => {
  expect(
    pipe(
      sequence(0, i => ++i),
      take(10),
      contains(2),
      console.log,
    ),
  ).toEqual('');
});
