const express = require('express');
const passport = require('passport');
const router = express.Router();

router.route('/google').get(passport.authenticate('google', {
    scope: [
        'https://www.googleapis.com/auth/plus.login',
        'https://www.googleapis.com/auth/plus.profile.emails.read'
    ]
}));
router.route('/google/callback').get(passport.authenticate('google', {
    successRedirect: '/users/',
    failure: '/error/'
}));


router.route('/twitter').get(passport.authenticate('twitter'));
router.route('/twitter/callback').get(passport.authenticate('twitter', {
    successRedirect: '/users/',
    failure: '/error/'
}));


router.route('/facebook').get(passport.authenticate('facebook', {
    scope: ['email']
}));
router.route('/facebook/callback').get(passport.authenticate('facebook', {
    successRedirect: '/users/',
    failure: '/error/'
}));


module.exports = router;