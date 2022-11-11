const { response } = require('express')
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const { generarJWT } = require('../helpers/jws')

const newUser = async( req, res = response ) => {

    const { name, email, password } = req.body

    try {

        const userEmail = await User.findOne({ email: email })
        const userName = await User.findOne({ name: name })

        if( userEmail ) {
            return res.status(400).json({
                ok: false,
                msg: 'Email ya registrado'
            })
        }

        if( userName ) {
            return res.status(400).json({
                ok: false,
                msg: 'Nombre en uso'
            })
        }

        const user = new User( req.body )

        const salt = bcrypt.genSaltSync()
        user.password = bcrypt.hashSync( password, salt ) 

        await user.save()

        const token = await generarJWT( user.id, user.name )

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token,
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
    
}

const loginUser = async( req, res = response ) => {

    const { email, password } = req.body

    try {
        
        const user = await User.findOne({ email: email })

        if ( !user ) {
            return res.status(400).json({
                ok: false,
                msg: 'Email no registrado'
            })
        } 

        const validPassword = bcrypt.compareSync( password, user.password )

        if( !validPassword ){
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            })
        }

        const token = await generarJWT( user.id, user.name )

        res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            votationParticipating: user.votationParticipating,
            token,
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Contactar administrador'
        })
    }

}


const renewToken = async( req, res = response ) => {

    const { uid, name } = req

    const token = await generarJWT( uid, name )

    res.json({
        ok: true,
        uid: uid,
        name: name,
        token
    })
}






module.exports = {
    newUser,
    loginUser,
    renewToken,
}