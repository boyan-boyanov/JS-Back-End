
const Create = require("../models/Create");


async function createPost(post) {
    const result = new Create(post);
    await result.save();

    return result
}

async function getPosts() {
    return Create.find({});
}

async function getPostById(id){
   console.log(Create.findById(id).populate('author', 'firstName', 'lastName'));
   console.log("here");
  //  return Create.findById(id).populate('author', 'firstName', 'lastName');
}

module.exports = {
    createPost,
    getPosts,
    getPostById
}