const { response } = require('express')
const Compare = require('../models/Compare')
const User = require('../models/User')

const getParticipants = async( req, res = response ) => {
    

    try {
        
        const { newParticipant } = req.body
        console.log( newParticipant )
        const user = await User.findOne({ name: newParticipant })
        console.log( user )


        res.status(202).json({
            ok: true,
            uid: user._id,
            name: user.name
        })
    

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Contactar administrador'
        })
    }
    
}



module.exports = {
    getParticipants,
    
}