/* global describe, it, expect, before */
/* jshint expr: true */

var chai = require('chai')
  , Strategy = require('../lib/strategy');


describe('Strategy', function() {
    
  describe('failing authentication', function() {
    var strategy = new Strategy(function(address, message, signed, done) {
      return done(null, false);
    });
    
    var info;
    
    before(function(done) {
      chai.passport(strategy)
        .fail(function(i) {
          info = i;
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
    
    it('should fail', function() {
      expect(info).to.be.undefined;
    });
  });
  
  describe('failing authentication with info', function() {
    var strategy = new Strategy(function(address, message, signed, done) {
      return done(null, false, { message: 'authentication failed' });
    });
    
    var info;
    
    before(function(done) {
      chai.passport(strategy)
        .fail(function(i) {
          info = i;
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
    
    it('should fail', function() {
      expect(info).to.be.an('object');
      expect(info.message).to.equal('authentication failed');
    });
  });
  
});
