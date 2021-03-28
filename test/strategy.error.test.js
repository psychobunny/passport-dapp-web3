/* global describe, it, expect, before */

var expect = require('expect');
var describe = require('describe');
var before = require('before');
var it = require('it');

var chai = require('chai')
  , Strategy = require('../lib/strategy');


describe('Strategy', function() {
    
  describe('encountering an error during verification', function() {
    var strategy = new Strategy(function(address, message, signed, done) {
      done(new Error('something went wrong'));
    });
    
    var err;
    
    before(function(done) {
      chai.passport(strategy)
        .error(function(e) {
          err = e;
          done();
        })
        .req(function(req) {
          req.body = {};
          req.body.address = '0x871228A1E5a0F147F875215C6a42A38f26919544';
          req.body.signed = '0xb97fa49616a41fc0b031786bd4d0a505b01cdb603fa842bd20308d19ecce6bf03a6dd3f2aa93f049612009df6a8728b3eefd5261d19ad1646880a1c43306cb191c';
          req.body.message = 'test';
        })
        .authenticate();
    });
    
    it('should error', function() {
      expect(err).to.be.an.instanceof(Error);
      expect(err.message).to.equal('something went wrong');
    });
  });
  
  describe('encountering an exception during verification', function() {
    var strategy = new Strategy(function(address, message, signed, done) {
      throw new Error('something went horribly wrong');
    });
    
    var err;
    
    before(function(done) {
      chai.passport(strategy)
        .error(function(e) {
          err = e;
          done();
        })
        .req(function(req) {
          req.body = {};
          req.body.address = '0x871228A1E5a0F147F875215C6a42A38f26919544';
          req.body.signed = '0xb97fa49616a41fc0b031786bd4d0a505b01cdb603fa842bd20308d19ecce6bf03a6dd3f2aa93f049612009df6a8728b3eefd5261d19ad1646880a1c43306cb191c';
          req.body.message = 'test';
        })
        .authenticate();
    });
    
    it('should error', function() {
      expect(err).to.be.an.instanceof(Error);
      expect(err.message).to.equal('something went horribly wrong');
    });
  });
  
});
