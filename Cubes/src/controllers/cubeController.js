const express = require('express')
const router = express.Router()
const cubes = require('../db.json')
const fs = require('fs/promises')
const path = require('path')

router.get('/create', (req, res) => {
    res.render('create')
})

router.post("/cubeCreate", (req, res) => {
    const cube = req.body;
    //vaidate
    if (cube.name.length < 2) {
        res.status(400);
        res.send('invalid request')
        return
    } else {
        //saveData
        cube.cubeId = makeId(24)
        cubes.push(cube)
        fs.writeFile(path.resolve('src', 'db.json'), JSON.stringify(cubes, '', 4), { encoding: "utf-8" })
            .then(() => {
                //redirect
                res.redirect('/')
            })
            .catch(err => {
                res.status(400)
                res.send(err)
            })




        console.log(cubes);
        
    }


})

module.exports = router;



const makeId = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}