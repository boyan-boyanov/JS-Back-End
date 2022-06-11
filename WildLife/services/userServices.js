const User = require('../models/User');
const { hash, compare } = require('bcrypt');

//TODO add all field requiered by the exam

async function register(firstName, lastName, email, password) {
    const existing = await getUserByIdentifier(email);

    if (existing) {
        throw new Error('Email is taken');
    }

    const hashedPassword = await hash(password, 10);

    const user = new User({
        firstName,
        lastName,
        email,
        hashedPassword
    });
    await user.save();

    return user;
}


//TODO Change identifire
async function login(email, password) {
    const user = await getUserByIdentifier(email);

    if (!user) {
        throw new Error('Wrong email or password');
    }

    const hasMatch = await compare(password, user.hashedPassword);
    if (!hasMatch) {
        throw new Error('Wrong email or password');
    }

    return user;
}

//TODO identify user by identifier
async function getUserByIdentifier(email) {
    const user = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });

    return user
}

module.exports = {
    login,
    register
}