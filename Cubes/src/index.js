// стартирай с npm start  - настройка в package.json
const express = require('express')
const handlebars = require('express-handlebars')

const app = express()

app.use('/static', express.static("public")) //на всеки рекуест към /static използвай express.static()
app.engine('hbs', handlebars.engine({
    extname: 'hbs'
})) // използвай енджина с името hbs от handlebars , използвай и разширението hbs
app.set('view engine', 'hbs') // сетни hbs разширение за всичи файлове
app.set('views', './src/views') // търси вютата на този път


app.get('/', (req, res) => {
    res.render("index")
})


app.listen(5000)