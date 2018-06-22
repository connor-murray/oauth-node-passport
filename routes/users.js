const express = require('express');
const router = express.Router();

router.use('/', (req, res, next) => {
    if (!req.user) {
        res.redirect('/');
    }
    next();
});

router.get('/', (req, res) => {
    res.render('users', {user: req.user});
});

module.exports = router;
