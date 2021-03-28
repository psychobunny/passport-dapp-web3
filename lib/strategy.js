/**
 * Module dependencies.
 */
var passport = require('passport-strategy')
  , util = require('util')
  , lookup = require('./utils').lookup
  , ethAccounts = require('web3-eth-accounts');


/**
 * `Strategy` constructor.
 *
 * The web3 authentication strategy authenticates requests based on the
 * credentials submitted via a POST request.
 *
 * Applications must supply a `verify` callback which accepts `address`, `message` and
 * `signed` message fields, and then calls the `done` callback supplying a
 * `user`, which should be set to `false` if the credentials are not valid.
 * If an exception occurred, `err` should be set.
 *
 * Optionally, `options` can be used to change the fields in which the
 * credentials are found.
 *
 * Options:
 *   - `addressField`  field name where the address is found, defaults to _address_
 *   - `messageField`  field name where the message is found, defaults to _message_
 *   - `signedField`  field name where the signed message is found, defaults to _signed_
 *   - `passReqToCallback`  when `true`, `req` is the first argument to the verify callback (default: `false`)
 *
 * Example:
 *
 *     passport.use(new Web3Strategy(
 *       function(address, message, signed, done) {
 *         User.findOne({ address: address }, function (err, user) {
 *           done(err, user);
 *         });
 *       }
 *     ));
 *
 * @param {Object} options
 * @param {Function} verify
 * @api public
 */
function Strategy(options, verify) {
  if (typeof options == 'function') {
    verify = options;
    options = {};
  }
  if (!verify) { throw new TypeError('Web3Strategy requires a verify callback'); }
  
  this._addressField = options.addressField || 'address';
  this._messageField = options.messageField || 'message';
  this._signedField = options.signedField || 'signed';
  
  passport.Strategy.call(this);
  this.name = 'web3';
  this._verify = verify;
  this._passReqToCallback = options.passReqToCallback;
}

/**
 * Inherit from `passport.Strategy`.
 */
util.inherits(Strategy, passport.Strategy);

/**
 * Authenticate request based on the contents of a form submission.
 *
 * @param {Object} req
 * @api protected
 */
Strategy.prototype.authenticate = function(req, options) {
  options = options || {};
  var address = lookup(req.body, this._addressField) || lookup(req.query, this._addressField);
  var message = lookup(req.body, this._messageField) || lookup(req.query, this._messageField);
  var signed = lookup(req.body, this._signedField) || lookup(req.query, this._signedField);
  
  if (!address || !message || !signed) {
    return this.fail({ message: options.badRequestMessage || 'Missing credentials' }, 400);
  }

  /*
  This is like, literally the only thing I wrote. Thanks Jared and web3.js!
  -- <3, psychobunny
  */
  var accounts = new ethAccounts();
  if (address !== accounts.recover(message, signed)) {
    return this.fail({ message: options.badRequestMessage || 'Ooops. Signed message does not match address and message.' }, 400);
  }
  
  var self = this;
  
  function verified(err, user, info) {
    if (err) { return self.error(err); }
    if (!user) { return self.fail(info); }
    self.success(user, info);
  }
  
  try {
    if (self._passReqToCallback) {
      this._verify(req, address, message, signed, verified);
    } else {
      this._verify(address, message, signed, verified);
    }
  } catch (ex) {
    return self.error(ex);
  }
};


/**
 * Expose `Strategy`.
 */
module.exports = Strategy;
