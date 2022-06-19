const House = require('../models/House'); // change name of model

async function getAllHouse() {
    return House.find({}).lean();
}

async function getHouseById(id) {
    return House.findById(id).lean();
}

async function createHouse(data) {
    const result = new House(data);
    await result.save();
}

async function getHouseAndUsers(id) {
    return House.findById(id).populate('owner').populate('tourists').lean();
}

async function updateHouse(id, data) {
    const existing = await House.findById(id)

    existing.name = data.name,
        existing.type = data.type,
        existing.year = data.year,
        existing.city = data.city,
        existing.houseImg = data.houseImg,
        existing.description = data.description,
        existing.pieces = data.pieces,
        
    await existing.save()
}

async function deleteById(id) {
    await House.findByIdAndDelete(id)
}

async function joinHouse(houseId, userId) {
    const data = await House.findById(houseId)

    if(data.tourists.includes(userId)){
        throw new Error('User is already rent this house')
    }

    data.tourists.push(userId);
    await data.save()
}

module.exports = {
    getAllHouse,
    getHouseById,
    createHouse,
    getHouseAndUsers,
    deleteById,
    updateHouse,
    deleteById,
    joinHouse
}