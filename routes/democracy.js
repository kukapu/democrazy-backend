/*
    Rutas de Democracy / Democracy
    host + /api/democracy
*/ 

const { Router } = require('express')
const { check } = require('express-validator')
const { fieldsValidator } = require('../middlewares/fieldsValidator')
const router = Router()
const { validarJWT } = require('../middlewares/validarJWT')

const { getMyVotationsIds, getInfoVotations, getInfoVotationsFromUser, deleteVotation, addVotation, createVotation } = require('../controllers/democracy')


router.post('/createVotation',
    [
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
    ],
    getInfoVotations
)




module.exports = router