const { Schema, model } = require('mongoose');

const NAME_PATTERN = /^([a-zA-Z])+ ([a-zA-Z])+$/;
//TODO change user model according to exam description
//TODO add validation
const userSchema = new Schema({
    name: { type: String, required: true, validate: {
        validator(value) {
            return NAME_PATTERN.test(value)
        },
        message: 'Pleas enter first and last name only latters'
    } },
    username: { type: String, required: true, minlength: [5, "Username must be at least 5 characters long"] },
    hashedPassword: { type: String, required: true, minlength: [4, "Password must be at least 4 characters long"] },
});

//TODO change index parameter to email if it is written on the exam description
userSchema.index({ username: 2 }, {
    unique: true,
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', userSchema);

module.exports = User;