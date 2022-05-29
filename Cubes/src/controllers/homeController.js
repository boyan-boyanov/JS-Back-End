const router = require('express').Router();
const cubeServices = require('../services/cubeServices')
const cubes = require('../db.json') //Взимаме данните от файла

router.get('/', (req, res) => {
    const {search, from, to} = req.query
   
    const cubes = cubeServices.getAll(search, from, to)
   // console.log(cubes);
    res.render("index", {cubes}) // подаваме данните от cubes за да се рендерират
})

router.get("/about", (req,res) => {
    res.render("about")
})

module.exports = router


