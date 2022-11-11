/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/
const { Router } = require('express')
const { check } = require('express-validator')
const { fieldsValidator } = require('../middlewares/fieldsValidator')
const router = Router()
const { validarJWT } = require('../middlewares/validarJWT')

const { newUser, loginUser, renewToken } = require('../controllers/auth')



router.post(
    '/register', 
    [
        check('name', 'El nombre es obligatorio').notEmpty(),
        check('email', 'El email es obligatorio').notEmpty(),
        check('email', 'No estas introduciendo un email').isEmail(),
        check('password', 'El password tiene que tener entre 8-20 caracteres y que contenga al menos 1 letra y 1 numero')
            .isLength({ min: 8, max: 20 }).isAlphanumeric(),
        fieldsValidator

    ],
    newUser )

router.post(
    '/', 
    [
        check('email', 'El email es obligatorio').notEmpty(),
        check('email', 'No estas introduciendo un email').isEmail(),
        check('password', 'El password es obligatorio').notEmpty(),
        fieldsValidator
    ],
    loginUser)


router.get('/renew', validarJWT, renewToken)




module.exports = router