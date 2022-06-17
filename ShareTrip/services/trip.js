const Trip = require('../models/Trip');

async function getTripById(id) {
    return Trip.findById(id).lean();
}

async function createTrip(data) {
    const result = new Trip(data);
    await result.save();
}

async function getAllTrips() {

    return Trip.find({}).lean();
}

async function getTripAndUsers(id) {
    return Trip.findById(id).populate('owner').populate('buddies').lean();
}

async function updateTrip(id, data) {
    const existing = await Trip.findById(id)

    existing.start = data.start,
        existing.end = data.end,
        existing.date = data.date,
        existing.time = data.time,
        existing.carImg = data.carImg,
        existing.carBrand = data.carBrand,
        existing.seats = data.seats,
        existing.price = data.price,
        existing.description = data.description
        
        await existing.save()
}

module.exports = {
    createTrip,
    getTripById,
    getAllTrips,
    getTripAndUsers,
    updateTrip
};