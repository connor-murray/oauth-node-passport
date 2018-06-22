const facebookClientId = '998560020294837';
const facebookClientSecret = '70c26825282448992abd3c50e4a58bf7';
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../../models/userModel');
const facebookService = require('../../services/facebook')(facebookClientId, facebookClientSecret);

module.exports = () => {
    passport.use(new FacebookStrategy({
            clientID: facebookClientId,
            clientSecret: facebookClientSecret,
            callbackURL: 'http://localhost:3000/auth/facebook/callback',
            passReqToCallback: true
        },
        (req, accessToken, refreshToken, profile, done) => {
            if (userProfileExists(req)) {
                let userProfileQuery = req.user.google ? {'google.id': req.user.google.id} : {'twitter.id': req.user.twitter.id};
                User.findOne(userProfileQuery, (error, user) => {
                    addFacebookProfile(user, profile, accessToken, refreshToken, done);
                });
            } else {
                const facebookProfileQuery = {'facebook.id': profile.id};
                User.findOne(facebookProfileQuery, (error, user) => {
                    if (!user) {
                        user = new User;
                        user.displayName = profile.displayName;
                    }
                    addFacebookProfile(user, profile, accessToken, refreshToken, done);
                });
            }
        }
    ));
};

function userProfileExists(req) {
    return req.user && (req.user.google || req.user.twitter);
}

function addFacebookProfile(user, profile, accessToken, refreshToken, done) {
    facebookService.getImage(accessToken, (response) => {
        user.facebook = {id: profile.id, token: accessToken, refreshToken: refreshToken, image: response.url};
        user.save();
        done(null, user);
    });
}