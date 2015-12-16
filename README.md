
Install
```
npm install empty-promises
```

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
```
