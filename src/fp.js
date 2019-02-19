export const compose = (...fns) => x => fns.reduce((acc, fn) => fn(acc), x);

export const pipe = (value, ...fns) => compose(...fns)(value);

export const curry = fn => (...args) =>
  args.length < fn.length ? x => fn(x, ...args) : fn(...args);

export const also = fn => it => {
  fn();
  return it;
};
