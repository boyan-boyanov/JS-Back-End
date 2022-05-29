const cubes = require('../db.json') //Взимаме данните от файла

exports.index = (req, res) => {
    res.render("index", {cubes}) // подаваме данните от cubes за да се рендерират
}

exports.about = (req,res) => {
    res.render("about")
}