//TODO replace with actual service
const houseService = require("../services/house"); // name of service

const collectionService = {};

function preload() {
    return async function (req, res, next) {
         const id = req.params.id;
        //TODO Change propery name to match collection 
        const data = await houseService.getHouseById(id);
        res.locals.data = data
       
        next();
    }
}

module.exports = preload;