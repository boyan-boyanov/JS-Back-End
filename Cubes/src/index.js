const express = require('express')
const hbs = require('express-handlebars')

const app = express()

app.get('/', (req, res) => {
    res.send("test")
})


app.listen(5000)