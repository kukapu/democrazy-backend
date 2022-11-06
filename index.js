const express = require('express')
require('dotenv').config()
const cors = require('cors')
const { dbConnection } = require('./database/config')

// SERVER
const app = express()

// DB
dbConnection()

// CORS
app.use(cors())

// DIRECTORIO PUBLICO
app.use( express.static('public') )

// PARSEO BODY
app.use( express.json() )


// RUTAS
// Auth
app.use('/api/auth', require('./routes/auth'))

app.use('/api/new', require('./routes/newParticipant'))
// Democracy
app.use('/api/democracy', require('./routes/democracy'))




// ESCUCHAR PETICIONES
app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`)
})