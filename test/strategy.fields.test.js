/* global describe, it, expect, before */
/* jshint expr: true */

var chai = require('chai')
  , Strategy = require('../lib/strategy');


describe('Strategy', function() {
    
  describe('handling a request with valid credentials in body using custom field names', function() {
    var strategy = new Strategy({ addressField: 'pineapple', messageField: 'apple', signedField: 'pen' }, function(address, message, signed, done) {
      if (address == '0x871228A1E5a0F147F875215C6a42A38f26919544' && message && signed == '0xb97fa49616a41fc0b031786bd4d0a505b01cdb603fa842bd20308d19ecce6bf03a6dd3f2aa93f049612009df6a8728b3eefd5261d19ad1646880a1c43306cb191c') {
        return done(null, { id: '1234' }, { scope: 'read' });
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
          req.body = {};
          req.body.pineapple = '0x871228A1E5a0F147F875215C6a42A38f26919544';
          req.body.apple = 'test';
          req.body.pen = '0xb97fa49616a41fc0b031786bd4d0a505b01cdb603fa842bd20308d19ecce6bf03a6dd3f2aa93f049612009df6a8728b3eefd5261d19ad1646880a1c43306cb191c';
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
  });
  
  describe('handling a request with valid credentials in body using custom field names with object notation', function() {
    var strategy = new Strategy({ addressField: 'user[nodebb]', messageField: 'user[is]', signedField: 'user[awesome]',  }, function(address, message, signed, done) {
      if (address == '0x871228A1E5a0F147F875215C6a42A38f26919544' && message == 'test' && signed == '0xb97fa49616a41fc0b031786bd4d0a505b01cdb603fa842bd20308d19ecce6bf03a6dd3f2aa93f049612009df6a8728b3eefd5261d19ad1646880a1c43306cb191c') {
        return done(null, { id: '1234' }, { scope: 'read' });
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
          req.body = {};
          req.body.user = {};
          req.body.user.nodebb = '0x871228A1E5a0F147F875215C6a42A38f26919544';
          req.body.user.is = 'test';
          req.body.user.awesome = '0xb97fa49616a41fc0b031786bd4d0a505b01cdb603fa842bd20308d19ecce6bf03a6dd3f2aa93f049612009df6a8728b3eefd5261d19ad1646880a1c43306cb191c';
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
  });
  
});
