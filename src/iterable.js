import { compose, equals, pipe } from './fp';
import { naturals } from './numbers';

export const map = transform => function*(iterable) {
  for (const item of iterable) {
    yield transform(item);
  }
};

export const expand = transform => function* (iterable) {
  for (const item of iterable) {
    yield* transform(item);
  }
};

export const filter = predicate => function*(iterable) {
  for (const item of iterable) {
    if (predicate(item)) yield item;
  }
};

export const forEach = fn => iterable => {
  for (const item of iterable) {
    fn(item);
  }
};

export const takeWhile = predicate => function*(iterable) {
  for (const item of iterable) {
    if (!predicate(item)) break;
    yield item;
  }
};

export const skipWhile = predicate => function*(iterable) {
  let dropping = true;
  for (const item of iterable){
    if (!dropping) yield item;
    if (!predicate(item)) dropping = false;
  }
};

export const startWhen = predicate => function*(iterable) {
  let dropping = true;
  for (const item of iterable){
    if (predicate(item)) dropping = false;
    if (!dropping) yield item;
  }
};

export const take = n => compose(
  withIndex,
  takeWhile(([item, i]) => i < n),
  map(([value]) => value),
);

export const skip = n => function*(iterable) {
  for (const [item, index] of pipe(iterable, withIndex)) {
    if (index >= n) yield item;
  }
};

export const endWhen = predicate =>
  function*(iterable) {
    for (const item of iterable) {
      yield item;
      if (predicate(item)) break;
    }
  };


export function* sequence(seed, next) {
  yield seed;
  while (true) yield (seed = next(seed));
}


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

export const first = (predicate = item => true) => iterable => {
  for (const item of iterable) {
    if (predicate(item)) return item;
  }
  return null;
};

export const last = (predicate = item => true) => iterable => {
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

export const fold = (seed, operation) => reduce(operation, seed);

export const reduce = (operation, seed = null) => iterable => {
  let acc = seed ?? nextValue(iterable);
  for (const item of iterable) {
    acc = operation(acc, item);
  }
  return acc;
};

export const inject = (seed, operation) =>
  function*(iterable) {
    let acc = seed;
    for (const item of iterable) {
      yield (acc = operation(acc, item));
    }
  };

export const contains = element => some(equals(element));

export const sum = reduce((acc, cur) => acc + cur);

export const flatten = reduce((acc, cur) => [...acc, ...cur]);

export const join = separator => reduce((acc, cur) => `${acc}${separator}${cur}`);

export const zip = other => map(item => [item, nextValue(other)]);

export const withIndex = iterable =>
  pipe(
    iterable,
    zip(naturals()),
  );

export const length = compose(
  withIndex,
  last(),
  ([value, i]) => i + 1,
);

export const toArray = iterable => [...iterable];

export const toSet = iterable => new Set(iterable);

export const toString = reduce((acc, cur) => `${acc}${cur}`);

export const isEmpty = compose(
  length,
  it => it === 0,
);

export const average = compose(
  toArray,
  it => sum(it) / length(it),
);

export const unzip = fold([[], []], ([acc1, acc2], [item1, item2]) => [
  [...acc1, item1],
  [...acc2, item2],
]);
