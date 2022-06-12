const Create = require("../models/Create");


async function createPost(post) {
    const result = new Create(post);
    await result.save();

    return result
}

async function getPosts() {
    return Create.find({});
}

module.exports = {
    createPost,
    getPosts
}