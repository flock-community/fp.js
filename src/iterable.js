import { compose } from './fp';

export const map = transform =>
  function*(iterable) {
    for (const item of iterable) {
      yield transform(item);
    }
  };

export const expand = transform =>
  function*(iterable) {
    for (const item of iterable) {
      yield* transform(item);
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

export const forEach = fn => iterable => {
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

export const first = predicate => iterable => {
  for (const item of iterable) {
    if (predicate(item)) return item;
  }
  return null;
};

export const last = predicate => iterable => {
  let match = null;
  for (const item of iterable) {
    if (predicate(item)) match = item;
  }
  return match;
};

export const iterator = iterable => iterable[Symbol.iterator]();

export const nextValue = compose(
  iterator,
  it => it.next().value,
);



export const sum = reduce((acc, cur) => acc + cur);

export const flatten = reduce((acc, cur) => [...acc, ...cur]);

export const reduce = (operation, seed) => iterable => {
  let acc = seed;
  for (const item of iterable) {
    acc = operation(acc, item);
  }
  return acc;
};

export const join = separator => reduce((acc, cur) => `${acc}${separator}${cur}`);

export const length = compose(
  map(_ => 1),
  sum,
);

export const toArray = iterable => [...iterable];

export const toSet = iterable => new Set(iterable);

export const isEmpty = compose(
  length,
  it => it === 0,
);

export const average = compose(
  toArray,
  it => sum(it) / length(it),
);
