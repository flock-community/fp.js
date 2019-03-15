import { compose, curry } from './fp';
import { join, map } from './iterable';

const COMBINING_OVERLINE = '\u0305';

export const lAdd = curry((a, b) => b + a);

export const overline = compose(
  map(lAdd(COMBINING_OVERLINE)),
  join(''),
);