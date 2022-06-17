const { Schema, model, Types: { ObjectId } } = require('mongoose')

const tripSchema = new Schema({
    start: { type: String, required: true },
    end: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    carImg: { type: String, required: true },
    carBrand: { type: String, required: true },
    seats: { type: Number, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
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