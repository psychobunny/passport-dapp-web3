/* global describe, it, expect */
var expect = require('expect');
var describe = require('describe');
var it = require('it');
var strategy = require('..');

describe('passport-web3', function() {
  
  it('should export Strategy constructor directly from package', function() {
    expect(strategy).to.be.a('function');
    expect(strategy).to.equal(strategy.Strategy);
  });
  
});
