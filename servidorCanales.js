const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { nuevoCanal, getCanales, editCanal, deleteCanal } = require('./consultasCanales');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.post('/canal', async (req, res) => {
    const { nombre } = req.body
    const respuesta = await nuevoCanal(nombre)
    res.send(respuesta)
})

app.get('/canales', async (req, res) => {
    const respuesta = await getCanales()
    res.send(respuesta)
})

app.put('/canal/:id', async (req, res) => {
    const { id } = req.params
    const { nombre } = req.body
    const respuesta = await editCanal(id, nombre)
    res.send(respuesta)
})

app.delete('/canal/:id', async (req, res) => {
    const { id } = req.params
    const respuesta = await deleteCanal(id)
    respuesta > 0
        ? res.send({
            message: `El canal con el id ${id} fue eliminado con exito`
        })
        : res.send({
            message: 'No existe el canal que desea eliminar'
        })
})

app.listen(3000, () => {
    console.log('Servidor Encendido en http://localhost:3000')
});