const express = require("express");
const hbs = require("express-handlebars");
const mongoose = require('mongoose')

const movieControler = require('./controllers/movieController')

const app = express();
const url = 'mongodb://localhost:27017/movieDB'
mongoose.connect(url)
.then(()=> {
    console.log('db connected');
})
.catch((err)=>{
    console.log('db error: ', err);
})

app.use(express.urlencoded({extended: false}))
app.engine('hbs', hbs.engine({
    extname: 'hbs'
}));

app.set('view engine', 'hbs');

app.get('/', (req,res)=> {
    res.render('home')
})

app.use('/movies', movieControler)


app.listen(5000, () => console.log('server is listening on port 5000.....'))