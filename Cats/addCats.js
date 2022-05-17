const { Router } = require("express");

const router = Router();

router.get('/cats/add-cat', (req, res)=> {
    res.sendFile(__dirname + '/resources/views/addCat.html')
})

module.exports = router;

