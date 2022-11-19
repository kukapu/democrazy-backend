/*
    Rutas de Nuevos Participantes
    host + /api/new
*/ 

const { Router } = require('express')
const { check } = require('express-validator')
const { fieldsValidator } = require('../middlewares/fieldsValidator')
const router = Router()
const { validarJWT } = require('../middlewares/validarJWT')

const { getParticipants, getAllParticipants } = require('../controllers/newParticipant')



router.post(
    '/',
    [],
    getParticipants )

router.post(
    '/getAllParticipants',
    [],
    getAllParticipants
)




module.exports = router