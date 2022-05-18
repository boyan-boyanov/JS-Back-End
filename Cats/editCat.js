const { Router } = require('express')

const router = Router();

router.get('/editcat', (req,res)=> {
    res.sendFile(__dirname + '/resources/views/editCat.html')
})

module.exports = router