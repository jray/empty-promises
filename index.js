
'use strict';

const P = require('bluebird');

module.exports = (argArray, err) => {
  return () => {
    const resolver = P.pending();
    process.nextTick(() => {
      if (err) {
        resolver.reject(err);
      } else {
        if (argArray) {
          resolver.resolve(argArray);
        } else {
          resolver.resolve();
        }
      }
    });
    return resolver.promise;
  };
};
