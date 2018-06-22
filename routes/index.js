const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', {title: 'Social Media Integration Platform'});
});

module.exports = router;
