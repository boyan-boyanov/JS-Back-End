const { Schema, model } = require('mongoose');

//TODO change user model according to exam description
//TODO add validation
const userSchema = new Schema({
    address: {type: String, required: true},
    username: { type: String, required: true, minlength: [4, "Username must be at least 4 characters long"] },
    hashedPassword: { type: String, required: true, minlength: [3, "Password must be at least 3 characters long"] },
    
});

//TODO change index parameter to email if it is written on the exam description
userSchema.index({ username: 1 }, {
    unique: true,
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', userSchema);

module.exports = User;