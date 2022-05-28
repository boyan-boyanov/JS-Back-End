const { Router } = require('express');

const router = Router();

router.get('/cats/add-breed', (req, res) => {
    res.sendFile(__dirname + '/resources/views/addBreed.html')
});

module.exports = router;