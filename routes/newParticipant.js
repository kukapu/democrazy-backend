/*
    Rutas de Nuevos Participantes
    host + /api/new
*/ 

const { Router } = require('express')
const { check } = require('express-validator')
const { fieldsValidator } = require('../middlewares/fieldsValidator')
const router = Router()
const { validarJWT } = require('../middlewares/validarJWT')

const { getParticipants } = require('../controllers/newParticipant')



router.post(
    '/',
    [],
    getParticipants )




module.exports = router