
Install
```
npm install empty-promises
```

Quick Guide
```javascript
const emptyPromises = require('emptyPromises');
const asyncThing = emptyPromises();

asyncThing()
  .then((foo) => {
    t.notOk(foo);
    t.end();
  })
  .catch((e) => {
    throw e;
  });

const asyncThingWithArgs = emptyPromises(['foo', 'bar']);

asyncThingWithArgs()
  .spread((foo, bar) => {
    t.equal(foo, 'foo');
    t.equal(bar, 'bar');
    t.end();
  })
  .catch((e) => {
    throw e;
  });

const err = new Error('oh no!');
const asyncThingWithErr = emptyPromises(null, err);

asyncThing()
  .then(() => {
    t.fail('I should have caught an error');
  })
  .catch((e) => {
    t.equal(e.message, 'oh no!');
    t.end();
  });  
```

Practical Usage
```javascript
// in mocks.js
exports.mockSuccessObj = {
  doATask: emptyPromises()
};
exports.mockFailObj = {
  doATask: emptyPromises(null, new Error('Task failed!'))
};

// in test.js
const test = require('tape');
const mocks = require('./mocks');

test('it works when it works', (t) => {
  const aBusinessObject = aBusinessObjectFactory(mocks.mockSuccessObj);
  aBusinessObject.doStuffThatInvolvesMock()
    .then(() => {
      t.end('Yay!');
    })
    .catch((e) => {
      t.fail('I should not be here');
    });
});

test('it fails when it fails', (t) => {
  const aBusinessObject = aBusinessObjectFactory(mocks.mockFailObj);
  aBusinessObject.doStuffThatInvolvesMock()
    .then(() => {
      t.fail('I should not be here');
    })
    .catch((e) => {
      t.equal(e.message, 'Task failed!');
      t.end('You have failed and that is a good thing!');
    });
});
```
