const { isUser } = require('../middleware/guards');
const preload = require('../middleware/preload');
const { createTrip, updateTrip, deleteById, joinTrip } = require('../services/trip');
const mapErrors = require('../util/mappers');

const router = require('express').Router();

router.get('/create', isUser(), (req, res) => {
    res.render('create', { title: 'Creat Trip Offer' });
})

router.post('/create', isUser(), async (req, res) => {
    const data = {
        start: req.body.start,
        end: req.body.end,
        date: req.body.date,
        time: req.body.time,
        carImg: req.body.carImg,
        carBrand: req.body.carBrand,
        seats: Number(req.body.seats),
        price: Number(req.body.price),
        description: req.body.description,
        owner: req.session.user._id
    }

    try {
        await createTrip(data);
        //console.log(req.body);
        res.redirect('/trips')
    } catch (err) {
        console.error(err);
        const errors = mapErrors(err);                    //catch is same for all
        res.render('create', { data: data, errors, title: 'Create Trip Offer' })
    }

})

router.get('/edit/:id', preload(), (req, res) => {
    res.render('edit', { title: 'Edit Offer' })
})

router.post('/edit/:id', preload(), async (req, res) => {
    const id = req.params.id

    const data = {
        start: req.body.start,
        end: req.body.end,
        date: req.body.date,
        time: req.body.time,
        carImg: req.body.carImg,
        carBrand: req.body.carBrand,
        seats: Number(req.body.seats),
        price: Number(req.body.price),
        description: req.body.description,

    }
    console.log('or tripscontroler 43');
    console.log(req.body);
    try {
        await updateTrip(id, data)
        res.redirect('/trips/' + id);
    } catch (err) {
        console.error(err);
        const errors = mapErrors(err);
        data._id = id                   //catch is same for all
        res.render('edit', { data: data, errors, title: 'Create Trip Offer' })
    }

})

router.get('/delete/:id', preload(), async (req, res) => {
    await deleteById(req.params.id);
    res.redirect('/trips')
})

router.get('/join/:id', async (req, res) => {
    const id = req.params.id

    try {
        await joinTrip(id, req.session.user._id)
    } catch (error) {
        console.error(err);
    } finally {
        res.redirect('/trips/' + id)
    }
})


module.exports = router;