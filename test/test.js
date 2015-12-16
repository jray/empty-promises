
'use strict';

const test = require('tape');
const emptyPromises = require('../index');

test('empty', (t) => {
  const asyncThing = emptyPromises();
  asyncThing()
    .then((foo) => {
      t.notOk(foo);
      t.end();
    })
    .catch((e) => {
      throw e;
    });
});

test('with args', (t) => {
  const asyncThing = emptyPromises(['foo', 'bar']);
  asyncThing()
    .spread((foo, bar) => {
      t.equal(foo, 'foo');
      t.equal(bar, 'bar');
      t.end();
    })
    .catch((e) => {
      throw e;
    });
});

test('test error', (t) => {
  const err = new Error('oh no!');
  const asyncThing = emptyPromises(null, err);
  asyncThing()
    .then(() => {
      t.fail('I should have caught an error');
    })
    .catch((e) => {
      t.ok(e.message, 'oh no!');
      t.end();
    });
});
