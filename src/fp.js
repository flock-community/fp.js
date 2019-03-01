export const compose = (...fns) => x => fns.reduce((acc, fn) => fn(acc), x);

export const pipe = (value, ...fns) => compose(...fns)(value);

export const curry = fn => (...args) =>
  args.length < fn.length ? x => fn(x, ...args) : fn(...args);

export const also = fn => it => {
  fn(it);
  return it;
};

export const not = fn => it => !fn(it);

export const and = (...fns) => it => fns.every(fn => fn(it));

export const equals = y => x => x === y;
