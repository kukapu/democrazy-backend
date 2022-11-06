/*
    Rutas de Democracy / Democracy
    host + /api/democracy
*/ 

const { Router } = require('express')
const { check } = require('express-validator')
const { fieldsValidator } = require('../middlewares/fieldsValidator')
const router = Router()
const { validarJWT } = require('../middlewares/validarJWT')

const { getMyVotationsIds, getInfoVotations, getInfoVotationsFromUser, saveVotation, deleteVotation, addVotation, createVotation } = require('../controllers/democracy')


router.post('/createVotation',
    [
        // validarJWT,
        // check( 'userWannaRate', 'Debes introducir numero entre 0 y 10').isNumeric({ min:0, max: 10}),
    ],
    createVotation
)

router.post('/addVotation',
    [
        fieldsValidator
    ],
    addVotation)
 

router.post('/delete',
    [

    ],
    deleteVotation)


router.post('/results',
    [
        // fieldsValidator
    ],
    getMyVotationsIds
)

router.post('/results/info',
    [

    ],
    getInfoVotationsFromUser
)

router.post('/votations',
    [
        // fieldsValidator
    ],
    getInfoVotations
)




module.exports = router