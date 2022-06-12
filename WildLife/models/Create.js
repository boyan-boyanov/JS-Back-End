const { Schema, model } = require('mongoose');

const URL_PATTERN = /^https?:\/\//

const createSchema = new Schema({
    title: { type: String, minlength: [6, "Title must be at least 6 characters long"] },
    keyword: { type: String, minlength: [6, "Keyword must be at least 6 characters long"] },
    location: { type: String, maxlength: [15, "Location must be at most 15 characters long"] },
    data: { type: String, minlength: [10, "Data must be in format dd.mm.yyyy"], maxlength: [10, "Data must be in format dd.mm.yyyy"] },
    image: {
        type: String, validate: {
            validator(value) {
                return URL_PATTERN.test(value);
            },
            message: 'Image must be a valid URL'
        }
    },
    description: { type: String, minlength: [8, "Description must be at least 6 characters long"] },
    author: { type: ObjectId, ref: "User", require: true },
    votes: { type: ObjectId, ref: "User", default: [] },
    rating: { type: Number, default: 0 }
});

const Create = model('Create', createSchema);

module.exports = Create;