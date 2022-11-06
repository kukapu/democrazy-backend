const { Schema, model } = require('mongoose')


const UserSchema = Schema({
    type: {
        type: String,
        require: true
    },
    title: {
        type: String,
        require: true,
    }, 

    votation: { 
       type: Object,
       require: true
    },

    uidParticipants: {
        type: Array,
        require: true
    }
})

module.exports = model( 'Compare', UserSchema )