import { forEach, scan, Subject } from './async-iterable';
import { pipe } from './fp';
import { delay } from './promise';

test('test', async () => {
  const subject = new Subject<number>();

  pipe(
    subject,
    scan((a, b) => a + b, 0),
    forEach(console.log),
  );

  subject.add(1);
  await delay(1000);
  subject.add(2);
  await delay(1000);
  subject.add(3);
  await delay(1000);
  subject.add(4);
});
