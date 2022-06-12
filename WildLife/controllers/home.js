const { getPosts } = require('../services/createServices');
const { postViewModel } = require('../util/mappers');

const router = require('express').Router();

router.get("/", (req, res) => {

    res.render("home", { title: 'Home Page' })
})

router.get('/catalog', async (req, res) => {
    const posts = (await getPosts()).map(postViewModel);
    console.log(posts);
    res.render('catalog', { title: "Catalog", posts });
})

module.exports = router;