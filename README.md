# passport-dapp-web3

[Passport](http://passportjs.org/) strategy for authenticating with an address, message, and signed message for one-click secure :tm: SSO for your web3 based dapp.

It's probably important to note that I have no idea what I'm doing, and so you really should read this code yourself before you put it up on any production environment. But it works for me so please give it a try and submit any pull requests if you find anything derpy.

This is based on [passport-local](https://github.com/jaredhanson/passport-local) by [Jared Hanson](https://github.com/jaredhanson/). Additional credit goes to [web3.js](https://github.com/ChainSafe/web3.js/) by [https://github.com/ChainSafe/](ChainSafe) for doing the heavy lifting.


---

<p align="center">
  <sup>Sponsors</sup>
  <br>
  <a href="https://nodebb.org">
    <img src="/NodeBB/NodeBB/raw/master/public/images/logo.svg" alt="NodeBB" style="max-width:100%;">
  </a><br/>
  <a href="https://nodebb.org">NodeBB</a> is a node.js-based forum software that's lightning quick, easily customizable, and of course, open source. And guess what this repository is for! Don't you want a community platform that you can SSO via your crypto wallet? Of course you do, that's possibly why you're here? Go go go fork and have fun! ;D</a>
</p>

---


## Install

```bash
$ npm install passport-dapp-web3
```

## Usage

#### Configure Strategy

The web3 authentication strategy authenticates users using an address, message, and signed message. 
The strategy requires a `verify` callback, which accepts these
credentials and calls `done` providing a user.

```js
passport.use(new Web3Strategy(
  function(address, message, signed, done) {
    User.findOne({ address: address }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      
      return done(null, user);
    });
  }
));
```

##### Available Options

This strategy takes an optional options hash before the function, e.g. `new Web3Strategy({/* options */, callback})`.

The available options are:

* `addressField` - Optional, defaults to 'address'
* `messageField` - Optional, defaults to 'message'
* `signedField` - Optional, defaults to 'signed'

Both fields define the name of the properties in the POST body that are sent to the server.

#### Parameters

By default, `Web3Strategy` expects to find credentials in parameters
named address, message, and signed. If your site prefers to name these fields
differently, options are available to change the defaults. I don't even
know why I am supporting this but I suppose if you're too lazy or unable to 
change the existing form that you have, then lucky you.

    passport.use(new Web3Strategy({
        addressField: 'email',
        messageField: 'passwd',
        signedField: 'pineapples',
        session: false
      },
      function(address, message, signed, done) {
        // ...
      }
    ));

When session support is not necessary, it can be safely disabled by
setting the `session` option to false.

The verify callback can be supplied with the `request` object by setting
the `passReqToCallback` option to true, and changing callback arguments
accordingly.

    passport.use(new Web3Strategy({
        addressField: 'email',
        messageField: 'passwd',
        signedField: 'batman',
        session: false
      },
      function(req, address, message, signed, done) {
        // request object is now first argument
        // ...
      }
    ));

#### Authenticate Requests

Use `passport.authenticate()`, specifying the `'web3'` strategy, to
authenticate requests.

For example, as route middleware in an [Express](http://expressjs.com/)
application:

```js
app.post('/login', 
  passport.authenticate('web3', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });
```

## Examples

Developers using the popular [Express](http://expressjs.com/) web framework can
refer to an [example](https://github.com/passport/express-4.x-local-example)
as a starting point for their own web applications.

Additional examples can be found on the [wiki](https://github.com/jaredhanson/passport-local/wiki/Examples).

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2021 Andrew Carnegie Rodrigues <[https://github.com/psychobunny](https://github.com/psychobunny)>
Copyright (c) 2011-2015 Jared Hanson <[http://jaredhanson.net/](http://jaredhanson.net/)>