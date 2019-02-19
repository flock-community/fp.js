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

export const forEach = fn =>
  function(iterable) {
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

export const takeWhile = predicate =>
  function*(iterable) {
    for (const item of iterable) {
      if (!predicate(item)) break;
      yield item;
    }
  };

export const reduce = (operation, seed = null) => iterable => {
  let acc = seed;
  for (const item of iterable) {
    if (acc == null) {
      acc = item;
    } else {
      acc = operation(acc, item);
    }
  }
  return acc;
};

export const sum = reduce((acc, cur) => acc + cur, 0);

export const length = compose(
  map(_ => 1),
  sum,
);

export const join = separator => reduce((acc, cur) => `${acc}${separator}${cur}`);

export const iterator = iterable => iterable[Symbol.iterator];

export const toArray = iterable => [...iterable];

export const toSet = iterable => new Set(iterable);

export const isEmpty = compose(
  length,
  it => it === 0,
);
