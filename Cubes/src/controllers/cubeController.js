const express = require('express')
const router = express.Router()
const cubeServices = require('../services/cubeServices')

router.get('/create', (req, res) => {
    res.render('create')
})

router.post("/cubeCreate", async (req, res) => {
    const cube = req.body;
    //vaidate
    if (cube.name.length < 2) {
        res.status(400);
        res.send('invalid request')
        return
    } else {
        //saveData
        try {
            await cubeServices.save(cube)
            res.redirect('/')
        } catch (err) {
            res.status(400)
            res.send(err)
        }
    }
})

router.get('/details/:id', (req, res) => {

    const currentCube = cubeServices.getOne(req.params.id)
    console.log(currentCube);
    res.render('details', { currentCube })
})

module.exports = router;
