const router = require('express').Router();

const cubes = require('../db.json') //Взимаме данните от файла

router.get('/', (req, res) => {
    res.render("index", {cubes}) // подаваме данните от cubes за да се рендерират
})

router.get("/about", (req,res) => {
    res.render("about")
})

module.exports = router


