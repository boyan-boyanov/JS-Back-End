const preload = require('../middleware/preload');
const { getAllTrips } = require('../services/trip');

const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('home')
})

router.get('/trips', async (req, res) => {
    const data = await getAllTrips();
    console.log(data);
    res.render('catalog', { title: 'Shared Trips', data })
})

router.get('/trips/:id', preload(true), (req, res) => {
    if (req.session.user?._id == res.locals.data.owner._id) {
        res.locals.data.isOwner = true
    }


    res.render('details', { title: 'Trip Details' });
});

module.exports = router;
