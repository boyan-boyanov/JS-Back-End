const Item = require('../models/item'); // change name of model

async function getAllItems(type) {
    if (type) {
        return await Item.find({ type }).lean();
    } else {
        return Item.find({}).lean();
    }
    
}

async function getItemsById(id) {
    return Item.findById(id).lean();
}

async function createItem(data) {
    const result = new Item(data);
    await result.save();
}

async function getItemsAndUsers(id) {
    return House.findById(id).populate('owner').populate('tourists').lean();
}

async function updateItem(id, data) {
    const existing = await Item.findById(id)

    existing.title = data.title,
        existing.type = data.type,
        existing.technique = data.technique,
        existing.artImg = data.artImg,
        existing.certificate = data.certificate,


        await existing.save()
}

async function deleteById(id) {
    await Item.findByIdAndDelete(id)
}

async function shareItem(artId, userId) {
    const data = await Item.findById(artId)

    if(data.share.includes(userId)){
        throw new Error('User is already shared this item')
    }

    data.share.push(userId);
    await data.save()
}

module.exports = {
    getAllItems,
    getItemsById,
    createItem,
    getItemsAndUsers,
    deleteById,
    updateItem,
    shareItem


}