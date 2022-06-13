var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const passport = require('passport');
require("dotenv").config();
const { v4: uuidv4 } = require('uuid');
const User = require("../models/user.model");

passport.use(new GoogleStrategy({
    clientID:     process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/google/callback",
    // what is this for
    passReqToCallback   : true
  },
  async function(request, accessToken, refreshToken, profile, done) {
    let user = await User.findOne({email: profile._json.email});

    if(!user) {
        user = await User.create({
            email: profile._json.email,
            password: uuidv4(),
            category: ["seller"]
        })
    }
    
    return done(err, user);

    // console.log({request: request});
    // console.log({accessToken: accessToken});
    // console.log({refreshToken: refreshToken});
    console.log({email: profile._json.email});
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });

    // for dummy password uuidv4();
  }
));

module.exports = passport;