import { forEach, reduce, scan, Subject, takeWhile } from './async-iterable';
import { pipe } from './fp';
import { delay, then } from './promise';

test('test', async () => {
  const subject = new Subject<number>();

  // pipe(
  //   subject,
  //   scan((a, b) => a + b, 0),
  //   forEach(console.log),
  // );

  pipe(
    subject,
    takeWhile(it => it < 3),
    reduce((a, b) => a + b, 0),
    then(it => console.log(it)),
  );

  subject.add(1);
  await delay(1000);
  subject.add(2);
  await delay(1000);
  subject.add(3);
  await delay(1000);
  subject.add(4);
});
