/* global describe, it, expect */

var expect = require('expect');
var describe = require('describe');
var it = require('it');

var Strategy = require('../lib/strategy');


describe('Strategy', function() {
    
  var strategy = new Strategy(function(){});
    
  it('should be named web3', function() {
    expect(strategy.name).to.equal('web3');
  });
  
  it('should throw if constructed without a verify callback', function() {
    expect(function() {
      var s = new Strategy();
    }).to.throw(TypeError, 'Web3Strategy requires a verify callback');
  });
  
});
