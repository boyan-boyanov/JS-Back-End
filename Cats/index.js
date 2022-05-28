const express = require('express');
const addBreed = require('./addBreed')
const addCat = require('./addCats')
const editCat = require('./editCat')

const app = express()
app.use(addCat)
app.use(editCat)
app.use(addBreed)



app.get('/', (req, res) => {
    res.sendFile(__dirname + '/resources/views/home/index.html')
})

app.all('*', (req,res)=>{
    res.send("404 Custom not Found page")
})

app.listen(3000)