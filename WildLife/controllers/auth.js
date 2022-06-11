const { route } = require('express/lib/application');
const { isUser, isGuest } = require('../middleware/gards');
const { register, login } = require('../services/userServices');
const mapErrors = require('../util/mappers');

const router = require('express').Router();


router.get('/register', isGuest(), (req, res) => {
    res.render('register', { title: 'Register Page' });
})

// TODO check form action, method, field names
router.post('/register', isGuest(), async (req, res) => {

    try {
        if (req.body.password != req.body.repass) {
            throw new Error("Passwords don\'t match");
        }

        const user = await register(req.body.firstName, req.body.lastName, req.body.email, req.body.password);
        req.session.user = user;

        res.redirect('/'); //TODO check redirect requriements

    } catch (err) {
        //TODO send error message
        const errors = mapErrors(err);
        const data = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email
        }
        res.render('register', { title: 'Register Page', data, errors })
    }

})

router.get('/login', isGuest(), (req, res) => {
    res.render('login', { title: 'Login Page' })
})

//TODO check form action , method, field names
router.post('/login', isGuest(), async (req, res) => {
    try {
        const user = await login(req.body.email, req.body.password);
        req.session.user = user;
        res.redirect('/'); //TODO chech redirect requriements
    } catch (err) {
        console.error(err);
        //TODO send error message
        const errors = mapErrors(err);
        res.render('login', { title: 'Login Page', data: { email: req.body.email }, errors })
    }
})

router.get('/logout', isUser(), (req, res) => {
    delete req.session.user;
    res.redirect('/')
})

module.exports = router;