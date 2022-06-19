const { Schema, model, Types: { ObjectId } } = require('mongoose') //

const URL_PATTERN = /^https?:\/\/(.+)/; //

const itemSchema = new Schema({
    title: { type: String, required: true, minlength: [6, "Title must be at least 6 characters long"] },
    certificate: { type: String, required: true, enum: ['Yes', 'No'] },

    technique: { type: String, required: true, maxlength: [15, "Technique must be at most 15 characters long"] },
    owner: { type: ObjectId, ref: 'User', required: true },
    share: { type: [ObjectId], ref: "User", required: true },
    artImg: {
        type: String, required: true, validate: {
            validator(value) {
                return URL_PATTERN.test(value)
            },
            message: 'Item image must be valid url'
        }
    },
})

const Item = model("Item", itemSchema);

module.exports = Item;