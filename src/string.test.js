import { overline } from './string';

test('overline', () => {
  expect(overline('hello')).toEqual('̅h̅e̅l̅l̅o');
});