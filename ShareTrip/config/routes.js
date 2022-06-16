const auhtController = require('../controllers/auth');
const tripControler = require('../controllers/trip')
const homeController = require('../controllers/home')

module.exports = (app) => {
    app.use(auhtController);
    app.use(tripControler);
    app.use(homeController);



    app.get('/*', (req,res)=>{
        res.render("404", {title: 'Page Not Found'})
    })
}