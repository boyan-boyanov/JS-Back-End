const auhtController = require('../controllers/auth');
const homeController = require('../controllers/home')//
const itemControler = require('../controllers/item') // change name

module.exports = (app) => {
    app.use(auhtController);
    app.use(homeController); //
    app.use(itemControler);// change name

    app.get('/*', (req,res)=>{
        res.render("404", {title: 'Page Not Found'})
    })
}