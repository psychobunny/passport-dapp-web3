/* global describe, it, expect, before */
/* jshint expr: true */

var chai = require('chai')
  , Strategy = require('../lib/strategy');


describe('Strategy', function() {
    
  describe('passing request to verify callback', function() {
    var strategy = new Strategy({passReqToCallback: true}, function(req, address, message, signed, done) {
      if (address == '0x871228A1E5a0F147F875215C6a42A38f26919544' && message == 'test' && signed == '0xb97fa49616a41fc0b031786bd4d0a505b01cdb603fa842bd20308d19ecce6bf03a6dd3f2aa93f049612009df6a8728b3eefd5261d19ad1646880a1c43306cb191c') {
        return done(null, { id: '1234' }, { scope: 'read', foo: req.headers['x-foo'] });
      }
      return done(null, false);
    });
    
    var user
      , info;
    
    before(function(done) {
      chai.passport(strategy)
        .success(function(u, i) {
          user = u;
          info = i;
          done();
        })
        .req(function(req) {
          req.headers['x-foo'] = 'hello';
          
          req.body = {};
          req.body.address = '0x871228A1E5a0F147F875215C6a42A38f26919544';
          req.body.signed = '0xb97fa49616a41fc0b031786bd4d0a505b01cdb603fa842bd20308d19ecce6bf03a6dd3f2aa93f049612009df6a8728b3eefd5261d19ad1646880a1c43306cb191c';
          req.body.message = 'test';
        })
        .authenticate();
    });
    
    it('should supply user', function() {
      expect(user).to.be.an.object;
      expect(user.id).to.equal('1234');
    });
    
    it('should supply info', function() {
      expect(info).to.be.an.object;
      expect(info.scope).to.equal('read');
    });
    
    it('should supply request header in info', function() {
      expect(info.foo).to.equal('hello');
    });
  });
  
});
