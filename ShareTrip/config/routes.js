const auhtController = require('../controllers/auth');

module.exports = (app) => {
    app.use(auhtController);
}