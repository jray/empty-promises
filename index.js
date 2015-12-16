
'use strict';

const P = require('bluebird');

module.exports = (argArray) => {
  return () => {
    const resolver = P.pending();
    process.nextTick(() => {
      if (argArray) {
        resolver.resolve(argArray);
      } else {
        resolver.resolve();
      }
    });
    return resolver.promise;
  };
};
