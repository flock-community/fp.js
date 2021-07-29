export function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function then<T>(callback) {
  return (promise: PromiseLike<T>) => {
    return promise.then(callback);
  }
}
