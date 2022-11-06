const { Schema, model } = require('mongoose')


const UserSchema = Schema({
    name: {
        type: String,
        require: true,
        unique: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    votationParticipating: {
        type: Array,
    }
})

module.exports = model( 'User', UserSchema )