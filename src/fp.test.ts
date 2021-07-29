import { compose, equals, pipe, when } from './fp';

test('compose', () => {
  const f = x => x + 1;
  const g = x => x ** 2;

  const h = x => (x + 1) ** 2;

  const composedH = compose(
    f,
    g,
  );

  expect(composedH(1)).toEqual(h(1));
  expect(composedH(0)).toEqual(h(0));
  expect(composedH(-1)).toEqual(h(-1));
});

test('pipe', () => {
  expect(
    pipe(
      'John',
      it => 'Hello, ' + it,
      it => it + '!',
    ),
  ).toEqual('Hello, John!');
});

test('when', () => {
  expect(
    pipe(
      'Hello',
      when([
        [equals('Hello'), () => 1],
        [equals('A'), () => 2]
      ]),
    ),
  ).toEqual(1);
});
