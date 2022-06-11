const { route } = require('express/lib/application');
const { isUser, isGuest } = require('../middleware/gards');
const { register, login } = require('../services/userServices');
const mapErrors = require('../util/mappers');

const router = require('express').Router();


router.get('/register', isGuest(), (req, res) => {
    res.render('register');
})

// TODO check form action, method, field names
router.post('/register', isGuest(), async (req, res) => {

    try {
        if (req.body.password != req.body.repass) {
            throw new Error("Passwords don\'t match");
        }

        const user = await register(req.body.username, req.body.password);
        req.session.user = user;
        res.render('/'); //TODO check redirect requriements

    } catch (err) {
        //TODO send error message
        const errors = mapErrors(err);
        res.render('register', { data: { username: req.body.username }, errors })
    }

})

router.get('/login', isGuest(), (req, res) => {
    res.render('login')
})

//TODO check form action , method, field names
router.post('/login', isGuest(), async (req, res) => {
    try {
        const user = await login(req.body.username, req.body.password);
        req.session.user = user;
        res.redirect('/'); //TODO chech redirect requriements
    } catch (err) {
        console.error(err);
        //TODO send error message
        const errors = mapErrors(err);
        res.render('login', { data: { username: req.body.username }, errors })
    }
})

router.get('/logout', isUser(), (req, res) => {
    delete req.session.user;
    res.redirect('/')
})

module.exports = router;