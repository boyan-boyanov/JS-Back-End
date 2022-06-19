const preload = require('../middleware/preload');
const router = require('express').Router();
const { getAllTrips } = require('../services/trip');


router.get('/', (req, res) => {
    res.render('home')
})

router.get('/trips', async (req, res) => {
    const data = await getAllTrips();
    console.log(data);
    res.render('catalog', { title: 'Shared Trips', data })
})

router.get('/trips/:id', preload(true), (req, res) => {
    const data = res.locals.data
    data.remainingSeats = data.seats - data.buddies.length
    
    if (req.session.user?._id == data.owner._id) {
        data.isOwner = true
    }
        console.log("homecontroler");
        console.log(data.buddies);
        if (data.buddies.some(b => b._id == req.session.user._id)) {
            data.isJoined = true
        
    }


    res.render('details', { title: 'Trip Details' });
});

module.exports = router;
