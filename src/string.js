import { curry, pipe } from './fp';
import { join, map } from './iterable';

const COMBINING_OVERLINE = '\u0305';

export const lAdd = b => a => b + a;

export const overline = string => pipe(
  string,
  map(lAdd(COMBINING_OVERLINE)),
  join(''),
);