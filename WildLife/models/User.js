const { Schema, model } = require('mongoose');

//TODO change user model 
const userSchema = new Schema({
    username: { type: String, required: true },
    hashedPassword: {type: String, required: true}
});

userSchema.index({username: 2}, {
    unique: true,
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', userSchema);

module.exports = User;