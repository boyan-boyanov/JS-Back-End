const { isUser } = require('../middleware/guards');//
const preload = require('../middleware/preload');//
const router = require('express').Router();//
const mapErrors = require('../util/mappers');//

const { createItem, updateItem, deleteById, shareItem } = require('../services/items'); // change names

router.get('/create', isUser(), (req, res) => {
    res.render('create', { title: 'Creat Item' });
})

router.post('/create', isUser(), async (req, res) => {
    const data = {...req.body}
    data.owner = req.session.user._id
    
    try {
        await createItem(data);
        console.log(req.body);
        res.redirect('/')
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
    res.render('edit', { title: 'Edit Item' })
})

router.post('/edit/:id', preload(), async (req, res) => {
    const id = req.params.id
    
    try {
      
        await updateItem(id, {...req.body})
        res.redirect('/catalog/' + id);
    } catch (err) {
        console.error(err);
        const errors = mapErrors(err);
        data._id = id                   //catch is same for all
        res.render('edit', { data: data, errors, title: 'Edit Item' })
    }

})

router.get('/share/:id', async (req, res) => {
    const id = req.params.id

    try {
        await shareItem(id, req.session.user._id)
    } catch (error) {
        console.error(err);
    } finally {
        res.redirect('/')
    }
})



module.exports = router