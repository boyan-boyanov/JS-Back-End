const { Schema, model, Types: { ObjectId } } = require('mongoose')

const URL_PATTERN = /^https?:\/\/(.+)/;

const tripSchema = new Schema({
    start: { type: String, required: true, minlength: [4, "Starting poin must be at least 4 characters long"] },
    end: { type: String, required: true, minlength: [4, "End poin must be at least 4 characters long"] },
    date: { type: String, required: true },
    time: { type: String, required: true },
    carImg: {
        type: String, required: true, validate: {
            validator(value) {
                return URL_PATTERN.test(value)
            },
            message: 'Car image must be valid url'
        }
    },
    carBrand: { type: String, required: true, minlength: [4, "Car brand must be at least 4 characters long"] },
    seats: { type: Number, required: true, min: 0, max: 4 },
    price: { type: Number, required: true, min: 1, max: 50 },
    description: { type: String, required: true, minlength: [10, "Description  must be at least 10 characters long"] },
    owner: { type: ObjectId, ref: 'User', required: true },
    buddies: { type: [ObjectId], ref: "User", required: true },
})

const Trip = model("Trip", tripSchema);

module.exports = Trip;

/*
•	Start Point - string (required), 
•	End Point – string (required),
•	Date – string (required),
•	Time – string (required),
•	Car Image – string (required),
•	Car Brand – string (required),
•	Seats – number (required),
•	Price – number (required),
•	Description – string (required),
•	Creator – object Id (reference to the User model),
•	Buddies – a collection of Users (reference to the User model)

*/ 