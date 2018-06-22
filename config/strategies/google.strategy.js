const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../../models/userModel');

module.exports = () => {
    passport.use(new GoogleStrategy({
            clientID: '953159354156-v6p5oithluiqkssbk275nt2kvt97hlg5.apps.googleusercontent.com',
            clientSecret: 'W36TS3d_59HcxViIIUsr-aAu',
            callbackURL: 'http://localhost:3000/auth/google/callback',
            passReqToCallback: true
        },
        (req, accessToken, refreshToken, profile, done) => {
            if (userProfileExists(req)) {
                let userProfileQuery = req.user.twitter ? {'twitter.id': req.user.twitter.id} : {'facebook.id': req.user.facebook.id};
                User.findOne(userProfileQuery, (error, user) => {
                    addGoogleProfile(user, profile, accessToken, refreshToken, done);
                });
            } else {
                const googleProfileQuery = {'google.id': profile.id};
                User.findOne(googleProfileQuery, (error, user) => {
                    if (!user) {
                        user = new User;
                        user.displayName = profile.displayName;
                    }
                    addGoogleProfile(user, profile, accessToken, refreshToken, done);
                });
            }
        }
    ));
};

function userProfileExists(req) {
    return req.user && (req.user.facebook || req.user.twitter);
}

function addGoogleProfile(user, profile, token, refreshToken, done) {
    user.google = {id: profile.id, image: profile._json.image.url, token: token, refreshToken: refreshToken};
    user.save();
    done(null, user);
}