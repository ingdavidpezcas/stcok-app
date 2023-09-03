require('dotenv').config()
const express = require('express')

const app = express()

app.get('/', (req, res) => {

    console.log("Peticion recibida")

    res.send("<h1>Hola mundo</h1>")
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log('Escuchando en el puerto ${PORT}')
})