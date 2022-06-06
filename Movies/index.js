const express = require("express");
const hbs = require("express-handlebars");
const { MongoClient } = require('mongodb')

const app = express();
const url = 'mongodb://localhost:27017'
const client = new MongoClient(url)

client.connect()
.then(()=>{
    console.log('DB connecting done');
})

const db = client.db('movieDB')
const movieCollection = db.collection('movies')

app.engine('hbs', hbs.engine({
    extname: 'hbs'
}));

app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('home')
})

app.listen(5000, () => console.log('server is listening on port 5000.....'))