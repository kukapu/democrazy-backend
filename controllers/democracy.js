const { response } = require('express')
const { SaveVotationInUser } = require('../helpers/SaveVotationInUser')
const Compare = require('../models/Compare')
const User = require('../models/User')


const createVotation = async ( req, res = response ) => {

    try {
        const data = req.body
        // console.log(data)
        const votation = new Compare( data )
        votation.save()

        votation.uidParticipants.map( idParticipant => {
            // const user = User.findOne({ _id: idParticipant })
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
        console.log( votation )

        const compare = await Compare.findById(votationId)

        console.log(compare)

        // const votationDB = compare.votation
        // votationDB[uid] = votation
        compare.votation = votation
        compare.save()
        console.log(compare)

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
        // console.log(votationId)
        // console.log( uidParticipants )

        const votation = await Compare.findById(votationId)
        // console.log(votation.uidParticipants)

        uidParticipants.forEach( async(uid) => {
            const user = await User.findById(uid)

            // console.log(user.votationParticipating)
            const votationParticipatingDeleted = user.votationParticipating.filter( vid =>  vid.toString() !== votationId )
            // console.log(votationParticipatingDeleted)
            user.votationParticipating = votationParticipatingDeleted
            console.log(user.votationParticipating)
            user.save()
            console.log('user actualizado')

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
    console.log( user )

    res.status(202).json({
        ok: true,
        votationParticipating: user.votationParticipating,
    })
}

const getInfoVotationsFromUser = async ( req, res = response ) => {

    const { uid } = req.body

    const user = await User.findOne({ uid: uid })
    // console.log( user )
    // console.log(user.votationParticipating)


    const infoVotations = await Promise.all(
        user.votationParticipating.map( async (votationId) => {
            const compare = await Compare.findOne({ _id: votationId })
            console.log(compare)
            return compare
    }))

    // console.log(infoVotations)

    // const infoVotations = []
    // for ( const votationId of user.votationParticipating ) {
    //     console.log(votationId)
    //     const infoVotation = await Compare.findOne({ _id: votationId })
    //     infoVotations.push( infoVotation )
    //     console.log(infoVotations)
    // }
    // console.log(infoVotations)

    res.status(202).json({
        ok: true,
        // votationParticipating: user.votationParticipating,
        infoVotations,
    })

}

const getInfoVotations = async ( req, res = response ) => {

    try {

        const { votationId } = req.body
        const compare = await Compare.findOne({ _id: votationId })
        console.log( compare )


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