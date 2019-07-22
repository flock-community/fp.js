export class Subject<T> implements AsyncIterable<T>, AsyncIterator<T> {
  private receivers: Deferred<T>[] = [];

  add(value: T) {
    this.receivers.forEach(it => it.resolve(value));
    this.receivers = [];
  }

  async next() {
    const deferred = new Deferred<T>();
    this.receivers.push(deferred);
    return {
      value: await deferred.promise,
      done: false,
    };
  }

  [Symbol.asyncIterator]() {
    return this;
  }
}

class Deferred<T> {
  public promise: Promise<T>;
  public resolve: (value: T) => void;
  public reject: (reason?: any) => void;

  constructor() {
    this.promise = new Promise(((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    }));
  }
}

export function scan<T, R>(operation: (accumulator: R, current: T) => R, seed: R) {
  return async function*(iterable: AsyncIterable<T>) {
    let accumulator = seed;
    for await(const current of iterable) {
      accumulator = operation(accumulator, current);
      yield accumulator;
    }
  };
}

export function forEach<T>(fn: (value: T) => void) {
  return async function(iterable: AsyncIterable<T>) {
    for await (const item of iterable) {
      fn(item);
    }
  };
}
