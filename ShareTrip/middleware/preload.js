//TODO replace with actual service
const tripService = require("../services/trip"); // name of service

function preload(populate) {
    return async function (req, res, next) {
        const id = req.params.id;
        
        if (populate) {
            const data = await tripService.getTripAndUsers(id)
            res.locals.data = data
        }else {
            const data = await tripService.getTripById(id);
            res.locals.data = data
    
        }
        //TODO Change propery name to match collection 
        next();
    }
}

module.exports = preload;