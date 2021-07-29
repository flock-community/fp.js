export function compose<F>(f: F): F;

export function compose<F1, F2, R>(f1: (x1: F1) => F2, f2: (x2: F2) => R): (x1: F1) => R;

export function compose<F1, F2, F3, R>(
  f1: (x1: F1) => F2,
  f2: (x2: F2) => F3,
  f3: (x2: F3) => R,
): (x1: F1) => R;
export function compose<F1, F2, F3, F4, R>(
  f1: (x1: F1) => F2,
  f2: (x2: F2) => F3,
  f3: (x2: F3) => F4,
  f4: (x2: F4) => R,
): (x1: F1) => R;
export function compose<F1, F2, F3, F4, F5, R>(
  f1: (x1: F1) => F2,
  f2: (x2: F2) => F3,
  f3: (x2: F3) => F4,
  f4: (x2: F4) => F5,
  f5: (x2: F5) => R,
): (x1: F1) => R;
export function compose<F1, F2, F3, F4, F5, R>(
  f1: (x1: F1) => F2,
  f2: (x2: F2) => F3,
  f3: (x2: F3) => F4,
  f4: (x2: F4) => F5,
  f5: (x2: F5) => R,
): (x1: F1) => R;
export function compose<F1, F2, F3, F4, F5, F6, R>(
  f1: (x1: F1) => F2,
  f2: (x2: F2) => F3,
  f3: (x2: F3) => F4,
  f4: (x2: F4) => F5,
  f5: (x2: F5) => F5,
  f6: (x2: F6) => R,
): (x1: F1) => R;

export function compose(...fns) {
  return x => fns.reduce((acc, fn) => fn(acc), x);
}

export function pipe<F>(f: F): F;
export function pipe<F1, R>(value: F1, f1: (x1: F1) => R): R;
export function pipe<F1, F2, R>(value: F1, f1: (x1: F1) => F2, f2: (x2: F2) => R): R;
export function pipe<X1, X2, X3, R>(
  value: X1,
  f1: (x: X1) => X2,
  f2: (x: X2) => X3,
  f3: (x: X3) => R,
): R;


export function pipe<F1, F2, F3, F4, R>(
  value: F1,
  f1: (x1: F1) => F2,
  f2: (x2: F2) => F3,
  f3: (x2: F3) => F4,
  f4: (x2: F4) => R,
): R;
export function pipe<F1, F2, F3, F4, F5, R>(
  value: F1,
  f1: (x1: F1) => F2,
  f2: (x2: F2) => F3,
  f3: (x2: F3) => F4,
  f4: (x2: F4) => F5,
  f5: (x2: F5) => R,
): R;
export function pipe<F1, F2, F3, F4, F5, F6, R>(
  value: F1,
  f1: (x1: F1) => F2,
  f2: (x2: F2) => F3,
  f3: (x2: F3) => F4,
  f4: (x2: F4) => F5,
  f5: (x2: F5) => F6,
  f6: (x2: F6) => R,
): R;

export function pipe(value, ...fns) {
  return fns.reduce((currentValue, fn) => fn(currentValue), value);
}

export const curry = fn => (...args) =>
  args.length < fn.length ? x => fn(x, ...args) : fn(...args);

export const also = fn => it => {
  fn(it);
  return it;
};

export const not = fn => it => !fn(it);

export const and = (...fns) => it => fns.every(fn => fn(it));

export function equals<T>(y: T) {
  return function(x: T) {
    return x === y;
  };
}

export const domain = (condition, domain) => it => {
  if (!condition(it))
    throw `Object does not satisfy domain.\nObject: ${JSON.stringify(it)}\nDomain: ${domain}`;
  return it;
};

export function when<T, R>(cases: [((t: T) => boolean), (t: T) => R][]) {
  return function(value: T) {
    for (const [condition, consequence] of cases) {
      if (condition(value)) {
        return consequence(value);
      }
    }
    throw 'Not exhaustive "when" function.';
  };
}

interface Observable<T> {}

type Op<T, R> = (source: Observable<T>) => Observable<R>;

declare function map<T, R>(fn: (value: T, index: number) => R): Op<T, R>;

declare function filter<T>(fn: (value: T, index: number) => boolean): Op<T, T>;

declare const source: Observable<number>;

const a = pipe(
  source,
  map(x => x.),
  map(x => x + '!!!'),
  filter(x => x.length < 20),
);

const result = filter(x => x.length < 20)(map(x => x + '!!!')(map(x => x + x)(source)));
