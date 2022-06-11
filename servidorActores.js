const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { nuevoActor, getActores, editActor, deleteActor } = require('./consultasActores')

app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(bodyParser.json())

app.post('/actor', async (req, res) => {
    const { nombre } = req.body
    const respuesta = await nuevoActor(nombre)
    res.send(respuesta)
})

app.get('/actores', async (req, res) => {
    const respuesta = await getActores()
    res.send(respuesta)
})

app.put('/actor/:id', async (req, res) => {
    const { id } = req.params
    const { nombre } = req.body
    const respuesta = await editActor(id, nombre)
    res.send(respuesta)
})

app.delete('/actor/:id', async ( req, res) => {
    const { id } = req.params
    const respuesta = await deleteActor(id)
    respuesta > 0
    if (respuesta >0) {
        res.send({
            message: `El actor con el id ${id} fue eliminado con exito`
        })
    } else {
        res.send({
            message: `El id del actor que desea eliminar no se encuentra registrado`
        })
    }
})

app.listen(8080, () => {
    console.log('Servidor Encendido en http://localhost:8080')
});

