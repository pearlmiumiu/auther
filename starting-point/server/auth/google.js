const router = require('express').Router();
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const { User } = require('../db/models');
router.get('/', passport.authenticate('google', { scope: 'email' }));


router.get('/verify',
passport.authenticate('google', {
  successRedirect: '/', // or wherever
  failureRedirect: '/' // or wherever
})
);

passport.use(
  new GoogleStrategy({
    clientID: '249741372666-nfjbsg5o67jeidupaq9rfh0a0cclpqpb.apps.googleusercontent.com',
    clientSecret: 'WT0uyqXSaV5iES0LvjoRAX1x',
    callbackURL: '/auth/google/verify'
  },
  /* The following callback will be used when passport successfully
     authenticates with Google (the provider) for us,
     using our `clientId`, `clientSecret` and the temporary token from the client
     Google sends the `token`, `refreshToken` and `profile`
     passport provides the `done` function
  */
  function (token, refreshToken, profile, done) {
    const info = {
      name: profile.displayName,
      email: profile.emails[0].value,
      photo: profile.photos ? profile.photos[0].value : undefined
    }
    User.findOrCreate({where: {
        googleId: profile.id
      },
      defaults: info
    }
  )
  .then(function ([user, createdBool]) {
    console.log("user", user)
    done(null, user);
  })
  .catch(done);
    /* the callback will pass back user profile information
       each service (Facebook, Twitter, and Google)
       will pass it back a different way.
       Passport standardizes the data that comes back in its profile object.
    ---
    Now that we have Google profile information for the client what should we do??
    --- fill this part in ---
    */
    // console.log('---', 'in verification callback', profile, '---');
    // done();
  })
);


// DOWNLOAD JSON
//  RESET SECRET


// Client ID
// 249741372666-nfjbsg5o67jeidupaq9rfh0a0cclpqpb.apps.googleusercontent.com
// Client secret
// WT0uyqXSaV5iES0LvjoRAX1x
module.exports = router;
