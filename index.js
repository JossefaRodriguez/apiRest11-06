const express = require("express")
const app = express()
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.listen(3000, () => {
    console.log('Servidor encendido en http://localhost:3000')
})

// Paso 2
let canales = [{ nombre: "TNT" }, { nombre: "ESP" }]
// Paso 3
app.get("/canales", (req, res) => {
    res.send(canales)
});
// Paso 4
app.post("/canal", async (req, res) => {
    const nuevo_Canal = req.body
    canales.push(nuevo_Canal)
    res.send(canales)
});
// Paso 5
app.put("/canal/:canal", async (req, res) => {
    const { canal } = req.params
    const { nombre } = req.body
    canales = canales.map((c) => (c.nombre == canal ? { nombre } : c))
    res.send(canales)
});
// Paso 6
app.delete("/canal/:canal", async (req, res) => {
    const { canal } = req.params
    canales = canales.filter((c) => c.nombre !== canal)
    res.send(canales)
});
