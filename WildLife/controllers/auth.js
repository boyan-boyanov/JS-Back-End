const { register, login } = require('../services/userServices')

const router = require('express').Router();


router.get('/register', (req, res) => {
    res.render('register');
})

// TODO check form action, method, field names
router.post('/register', async (req, res) => {

    try {
        if (req.body.password != req.body.repass) {
            throw new Error("Passwords don\'t match");
        }

        const user = await register(req.body.username, req.body.password);
        req.session.user = user;
        res.render('/'); //TODO check redirect requriements

    } catch (err) {
        res.render('register', { data: { username: req.body.username } })
    }

})

router.get('/login', (req, res) => {
    res.render('login')
})

//TODO check form action , method, field names
router.post('/login', async (req, res) => {
    try {
        const user = await login(req.body.username, req.body.password);
        req.session.user = user;
        res.redirect('/'); //TODO chech redirect requriements
    } catch (err) {
        console.error(err);
        res.render('login', { data: { username: req.body.username } })
    }
})

module.exports = router;