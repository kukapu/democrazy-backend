const { response } = require('express')
const { SaveVotationInUser } = require('../helpers/SaveVotationInUser')
const Compare = require('../models/Compare')
const User = require('../models/User')


const createVotation = async ( req, res = response ) => {

    try {
        const data = req.body
        const votation = new Compare( data )
        votation.save()

        votation.uidParticipants.map( idParticipant => {
            SaveVotationInUser( idParticipant, votation._id )
        })

        res.status(202).json({
            ok: true,
            votationId: votation._id
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const addVotation = async(  req, res = response ) => {

    try {

        const { votationId, votation, uid } = req.body

        const compare = await Compare.findById(votationId)


        compare.votation = votation
        compare.save()

        res.status(202).json({
            ok: true,
            msg: 'votacion guardada'
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}



const deleteVotation = async ( req, res = response ) => {

    try {
        const { votationId, uidParticipants } = req.body

        const votation = await Compare.findById(votationId)

        uidParticipants.forEach( async(uid) => {
            const user = await User.findById(uid)

            const votationParticipatingDeleted = user.votationParticipating.filter( vid =>  vid.toString() !== votationId )
            user.votationParticipating = votationParticipatingDeleted
            user.save()

        })

        votation.delete()


        res.status(202).json({
            ok: true,
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}


const getMyVotationsIds = async ( req, res = response ) => {

    const { uid } = req.body

    const user = await User.findOne({ uid: uid })

    res.status(202).json({
        ok: true,
        votationParticipating: user.votationParticipating,
    })
}

const getInfoVotationsFromUser = async ( req, res = response ) => {

    const { uid } = req.body



    const infoVotations = await Promise.all(
        user.votationParticipating.map( async (votationId) => {
            const compare = await Compare.findOne({ _id: votationId })
            return compare
    }))


    res.status(202).json({
        ok: true,
        infoVotations,
    })

}

const getInfoVotations = async ( req, res = response ) => {

    try {

        const { votationId } = req.body
        const compare = await Compare.findOne({ _id: votationId })


        res.status(202).json({
            ok: true,
            type: compare.type,
            title: compare.title,
            votation: compare.votation,
            uidParticipants: compare.uidParticipants,
            id: compare._id
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}

module.exports = {
    createVotation,
    addVotation,
    deleteVotation,

    getMyVotationsIds,
    getInfoVotations,
    getInfoVotationsFromUser,

}