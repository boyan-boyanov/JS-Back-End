const { isUser } = require('../middleware/gards');

const router = require('express').Router();

router.get('/create', isUser(), (req, res) => {
    res.render('create', { title: 'Create Page' })
})

module.exports = router;