const auhtController = require('../controllers/auth');//
const homeController = require('../controllers/home')//
const houseControler = require('../controllers/house') // change name

module.exports = (app) => {
    app.use(auhtController); //
    app.use(homeController); //
    app.use(houseControler);// change name

    app.get('/*', (req,res)=>{
        res.render("404", {title: 'Page Not Found'})
    })
}