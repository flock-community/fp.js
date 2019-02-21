import { compose } from './fp';

export const map = transform =>
  function*(iterable) {
    for (const item of iterable) {
      yield transform(item);
    }
  };

export const filter = predicate =>
  function*(iterable) {
    for (const item of iterable) {
      if (predicate(item)) yield item;
    }
  };

export const takeWhile = predicate =>
  function*(iterable) {
    for (const item of iterable) {
      if (!predicate(item)) break;
      yield item;
    }
  };

export const forEvery = fn => iterable => {
  for (const item of iterable) {
    fn(item);
  }
};

export const every = predicate => iterable => {
  for (const item of iterable) {
    if (!predicate(item)) return false;
  }
  return true;
};

export const some = predicate => iterable => {
  for (const item of iterable) {
    if (predicate(item)) return true;
  }
  return false;
};

export const iterator = iterable => iterable[Symbol.iterator]();

export const nextValue = compose(
  iterator,
  it => it.next().value,
);

export const reduce = (operation, seed = null) => iterable => {
  let acc = seed ?? nextValue(iterable);
  for (const item of iterable) {
    acc = operation(acc, item);
  }
  return acc;
};

export const sum = reduce((acc, cur) => acc + cur, 0);

export const average = iterable => sum(iterable) / length(iterable);

export const length = compose(
  map(_ => 1),
  sum,
);

export const join = separator => reduce((acc, cur) => `${acc}${separator}${cur}`);

export const toArray = iterable => [...iterable];

export const toSet = iterable => new Set(iterable);

export const isEmpty = compose(
  length,
  it => it === 0,
);
