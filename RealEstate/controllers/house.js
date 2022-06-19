const { isUser } = require('../middleware/guards');//
const preload = require('../middleware/preload');//
const router = require('express').Router();//
const mapErrors = require('../util/mappers');//

const { createHouse, updateHouse, deleteById, joinHouse } = require('../services/house'); // change names

router.get('/create', isUser(), (req, res) => {
    res.render('create', { title: 'Creat House' });
})

router.post('/create', isUser(), async (req, res) => {
    const data = {
        name: req.body.name,
        type: req.body.type,
        year: req.body.year,
        city: req.body.city,
        houseImg: req.body.houseImg,
        description: req.body.description,
        pieces: Number(req.body.pieces),
        owner: req.session.user._id
    }

    try {
        await createHouse(data);
        //console.log(req.body);
        res.redirect('/catalog')
    } catch (err) {
        console.error(err);
        const errors = mapErrors(err);                    //catch is same for all
        res.render('create', { data: data, errors, title: 'Create House' })
    }

})

router.get('/delete/:id', preload(), async (req, res) => {
    await deleteById(req.params.id);
    res.redirect('/catalog')
})

router.get('/edit/:id', preload(), (req, res) => {
    res.render('edit', { title: 'Edit House' })
})

router.post('/edit/:id', preload(), async (req, res) => {
    const id = req.params.id

    /*const data = {
        name: req.body.name,
        type: req.body.type,   // same like {...req.body}
        year: req.body.year,
        city: req.body.city,
        houseImg: req.body.houseImg,
        description: req.body.description,
        pieces: Number(req.body.pieces),
    }*/
    
    try {
       // console.log({...req.body});
        await updateHouse(id, {...req.body})
        res.redirect('/catalog/' + id);
    } catch (err) {
        console.error(err);
        const errors = mapErrors(err);
        data._id = id                   //catch is same for all
        res.render('edit', { data: data, errors, title: 'Edit House' })
    }

})

router.get('/join/:id', async (req, res) => {
    const id = req.params.id

    try {
        await joinHouse(id, req.session.user._id)
    } catch (error) {
        console.error(err);
    } finally {
        res.redirect('/catalog/' + id)
    }
})



module.exports = router