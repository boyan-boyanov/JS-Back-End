const { Schema, model, Types: { ObjectId } } = require('mongoose') //

const URL_PATTERN = /^https?:\/\/(.+)/; //

const houseSchema = new Schema({
    name: { type: String, required: true, minlength: [6, "Name must be at least 6 characters long"] },
    type: { type: String, required: true, enum: ['Apartment', 'Villa', 'House'] },
    year: { type: Number, required: true, 
        min: [1850, "Year must be betwin 1850 - 2021"], 
        max: [2021, "Year must be betwin 1850 - 2021"] },
    city: { type: String, required: true, minlength: [4, "City must be at least 4 characters long"] },
    houseImg: {
        type: String, required: true, validate: {
            validator(value) {
                return URL_PATTERN.test(value)
            },
            message: 'House image must be valid url'
        }
    },
    description: { type: String, required: true, max: [60, "Max character 60"] },
    pieces: { type: Number, required: true,
        min: [0, "Pieces must be betwin 0 - 10"], 
        max: [10, "Pieces must be betwin 0 - 10"]
     },
    owner: { type: ObjectId, ref: 'User', required: true },
    tourists: { type: [ObjectId], ref: "User", required: true },
})

const House = model("House", houseSchema);

module.exports = House;