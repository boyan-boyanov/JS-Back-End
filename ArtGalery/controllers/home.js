const { isUser } = require('../middleware/guards');
const preload = require('../middleware/preload'); //
const Item = require('../models/item');
//const Item = require('../models/Item');
const User = require('../models/User');
const { getAllItems } = require('../services/items');

const router = require('express').Router(); //

router.get('/', async (req, res) => {
    const data = await getAllItems();
    //console.log(data);

    res.render('home', { title: 'Home', data })
});

router.get('/catalog', async (req, res) => {
    const data = await getAllItems();
    // console.log(data);
    res.render('catalog', { title: 'Catalog', data })
})


router.get('/catalog/:id', preload(true), async (req, res) => {
    const data = res.locals.data
    //const sharedArt = data.share.length
    // data.pieces = data.pieces - joinedTourists
    const sharedArt = []

    if (data.share) {
        for (let art of data.share) {
            const user = await User.findOne({ _id: art._id });
            sharedArt.push(user.name)
        }
        data.allSharedArt = sharedArt.join(', ')
    }
    //console.log(data.tourists);
    const user = await User.findOne({_id: data.owner });
    data.name = user.username
    

    if (req.session.user?._id == data.owner._id) {
        data.isOwner = true
    }
    //  console.log("homecontroler");
    //  console.log(data.buddies);
    if (data.share.some(b => b._id == req.session.user._id)) {
      data.isShared = true

     }
    //console.log(data);
    res.render('details', { title: 'House Details' });
});

router.get('/profile', async (req, res) => {
    const data = req.session.user
    const artOwner = await Item.find({owner: data._id }).lean();
    let myArts = ""
    if(artOwner.length>0){
        let allArts = []
        for(let art of artOwner){
            allArts.push(art.title)
        }
        myArts = allArts.join(', ')
    }
    data.myArts = myArts

    
    console.log(data);
    

    
   


    res.render('profile', { title: 'Profile', data })
});

module.exports = router