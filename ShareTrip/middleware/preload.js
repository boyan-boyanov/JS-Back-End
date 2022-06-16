//TODO replace with actual service
const tripService = require("../models/Trip"); // name of service

function preload() {
    return async function (req, res, next) {
        const id = req.params.id;
        //TODO Change propery name to match collection 
        const data = await tripService.getTripById(id);
        res.locals.data = data

        next();
    }
}

module.exports = preload;