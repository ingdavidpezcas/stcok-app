require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const app = express()

mongoose.connect(
    `mongodb+srv://davidpecast:${process.env.MONGO_DB_PASS}@development.0ft65sa.mongodb.net/stock-app?retryWrites=true&w=majority`
).then((result) => {
    app.listen(PORT, () => {
        console.log(`Escuchando en el puerto ${PORT}`)
    })
    console.log('Conexion exitosa a la BBDA')
})
.catch((err) => console.log(err))

const productShema = mongoose.Schema(
    {
    name: { type: String, required: true },
    price: Number,
    },
    { timestamps: true }
)

const Product = mongoose.model('Product', productShema)

app.use(express.json())

app.post('/api/v1/products', (req, res) => {
    console.log("Peticion recibida")
    //res.status(200).sendFile('index.html', { root: __dirname })
    //next()
    //console.log({ body: req.body })
    const newProduct = new Product(req.body)

    newProduct.save().then( result => {
        res.status(201).json({ ok: true })
    })
    .catch((err) => console.log(err))
})

app.use(express.static(path.join(__dirname, 'public')))

const PORT = process.env.PORT
