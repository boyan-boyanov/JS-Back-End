const { isUser } = require('../middleware/guards');
const preload = require('../middleware/preload'); //
const House = require('../models/House');
const User = require('../models/User');
const { getAllHouse } = require('../services/house');// change name
const router = require('express').Router(); //


router.get('/', async (req, res) => {
    const alldata = await getAllHouse();
    const data = alldata.splice(-3)
    res.render('home', { title: 'Home', data })
});

router.get('/catalog', async (req, res) => {
    const data = await getAllHouse();
    // console.log(data);
    res.render('catalog', { title: 'Catalog', data })
})

router.get('/catalog/:id', preload(true), async (req, res) => {
    const data = res.locals.data
    const joinedTourists = data.tourists.length
    data.pieces = data.pieces - joinedTourists
    const touristsName = []

    if (data.tourists) {
        for (let toursit of data.tourists) {
            const user = await User.findOne({ _id: toursit._id });
            touristsName.push(user.name)
        }

        data.allTouristRentalThisHome = touristsName.join(', ')

    }
    //console.log(data.tourists);

    // data.remainingSeats = data.seats - data.buddies.length

    if (req.session.user?._id == data.owner._id) {
        data.isOwner = true
    }
    //  console.log("homecontroler");
    //  console.log(data.buddies);
    if (data.tourists.some(b => b._id == req.session.user._id)) {
        data.isJoined = true

    }
    res.render('details', { title: 'House Details' });
});









router.get('/search', isUser(), async (req, res) => {

    //res.render('search', { title: 'Search' })

    try {
        if (req.query.search) {
            let search = req.query.search.toLowerCase().split('');
            search[0] = search[0].toUpperCase()
            search = search.join('')
            let houses = await getAllHouse(search)
            const data = {
                isSearched: true,
            }
            console.log(houses);
            res.render('search', { title: 'Search', data, houses })
        }else {
            res.render('search', { title: 'Search'})
        }


    } catch (err) {
        console.error(err);
        const errors = mapErrors(err);                    //catch is same for all
        //  res.render('/login', { data: data, errors, title: 'Login' })
    }

})

module.exports = router