import { pipe, when } from './fp';
import { isAsyncIterable, map as asyncIterableMap, Subject } from './async-iterable';
import { isIterable, map as iterableMap } from './iterable';

export function map<T, R>(
  transform: (t: T) => R,
): { (it: Iterable<T>): Iterable<R>; (it: AsyncIterable<T>): AsyncIterable<R> };

export function map<T, R>(transform: (t: T) => R) {
  return when<Iterable<T> | AsyncIterable<T>, Iterable<R> | AsyncIterable<R>>([
    [isIterable, iterableMap(transform)],
    [isAsyncIterable, asyncIterableMap(transform)],
  ]);
}

const a = pipe(
  [1, 2, 3],
  map(it => it + 1),
);

const subject: AsyncIterable<number> = new Subject<number>();

const a = pipe(
  subject,
  map(it => it + 1),
);
