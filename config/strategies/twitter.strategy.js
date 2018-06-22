const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const User = require('../../models/userModel');

module.exports = () => {
    passport.use(new TwitterStrategy({
            consumerKey: 'BXWEDvOFjU48vDbO7ghY5JD0G',
            consumerSecret: 'hlFx63PDBbwljLvGPqB1zuI46YjWR7h6YmFjCXL4KzBmDs7ZG2',
            callbackURL: 'http://localhost:3000/auth/twitter/callback',
            passReqToCallback: true
        },
        (req, token, tokenSecret, profile, done) => {
            if (userProfileExists(req)) {
                let userProfileQuery = req.user.google ? {'google.id': req.user.google.id} : {'facebook.id': req.user.facebook.id};
                User.findOne(userProfileQuery, (error, user) => {
                    addTwitterProfile(user, profile, token, tokenSecret, done);
                });
            } else {
                const twitterProfileQuery = {'twitter.id': profile.id};
                User.findOne(twitterProfileQuery, (error, user) => {
                    if (!user) {
                        user = new User;
                        user.displayName = profile.displayName;
                    }
                    addTwitterProfile(user, profile, token, tokenSecret, done);
                });
            }
        }
    ));
};

function userProfileExists(req) {
    return req.user && (req.user.google || req.user.facebook);
}

function addTwitterProfile(user, profile, token, tokenSecret, done) {
    user.twitter = {id: profile.id, image: profile._json.profile_image_url, token: token, tokenSecret: tokenSecret};
    user.save();
    done(null, user);
}