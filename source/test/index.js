const grange = require('../grange');
const test = require('tape');

const range = (start, end) => {
  const actual = end - start;
  return Array.from({ length: actual + 1 }, (x, i) => i++);
};

test('range', (assert) => {
  const msg = 'should return an array of numbers';
  const [...actual] = grange(3, 6);
  const expected = [3, 4, 5, 6];

  assert.same(actual, expected, msg);
  assert.end();
});

test('increment', (assert) => {
  const msg = 'should obey increment';
  const [...actual] = grange(2, 6, { step: 2 });
  const expected = [2, 4, 6];

  assert.same(actual, expected, msg);
  assert.end();
});
test('transform', (assert) => {
  const msg = 'should use transform if provided';
  const [...actual] = grange(1, 3, n => n * 2);
  const expected = [2, 4, 6];

  assert.same(actual, expected, msg);
  assert.end();
});
test('transform', (assert) => {
  const msg = 'should decrement';
  const [...actual] = grange(3, 1);
  const expected = [3, 2, 1];

  assert.same(actual, expected, msg);
  assert.end();
});
test('loop', (assert) => {
  const msg = 'should loop over range when loop is true';
  const loopGen = grange(1, 3, { loop: true });
  const actual = range(0, 7).map(() => loopGen.next().value);
  const expected = [1, 2, 3, 1, 2, 3, 1, 2];

  assert.same(actual, expected, msg);
  assert.end();
});
test('loop', (assert) => {
  const msg = 'should looop over decrementing range';
  const loopGen = grange(3, 1, { loop: true });
  const actual = range(0, 7).map(() => loopGen.next().value);
  const expected = [3, 2, 1, 3, 2, 1, 3, 2];

  assert.same(actual, expected, msg);
  assert.end();
});
test('omit start', (assert) => {
  const msg = 'should assume start is 0';
  const [...actual] = grange(6, n => n * 2, { step: 2 });
  const expected = [0, 4, 8, 12];

  assert.same(actual, expected, msg);
  assert.end();
});
