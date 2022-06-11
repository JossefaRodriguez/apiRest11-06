const { Pool } = require('pg')
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: '120313',
    database: 'actores_db',
    port: 5430,
})

async function nuevoActor(actor) {
    try {
        const result = await pool.query(`INSERT INTO actores (nombre) VALUES ('${actor}') RETURNING *`)
        return result.rows
    } catch (error) {
        return error
    }
}

async function getActores() {
    try {
        const result = await pool.query(`SELECT * FROM actores`)
        return result.rows
    } catch (error) {
        return error
    }
}

async function editActor(id, nuevoNombre) {
    try {
        const respuesta = await pool.query(`UPDATE actores SET nombre = '${nuevoNombre}' WHERE id = '${id}' RETURNING *`)
        return respuesta.rows
    } catch (error) {
        return error
    }
}

async function deleteActor(id) {
    try {
        const respuesta = await pool.query(`DELETE FROM actores WHERE id = '${id}' RETURNING *`)
        return respuesta.rowCount

    } catch (error) {
        return(error)
    }
}

module.exports = { nuevoActor, getActores, editActor, deleteActor }