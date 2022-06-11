const { Pool } = require('pg')
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: '120313',
    database: 'canales_db',
    port: 5430,
})

async function nuevoCanal(canal) {
    try {
        const result = await pool.query(`INSERT INTO canales (nombre) values ('${canal}') RETURNING *`
        );
        return result.rows;
    } catch (e) {
        return e;
    }
}

async function getCanales() {
    try {
        const result = await pool.query(`SELECT * FROM canales`)
        return result.rows
    } catch (e) {
        return e
    }
}

async function editCanal(id, nuevoNombre) {
    try {
        const res = await pool.query(`UPDATE canales SET nombre = '${nuevoNombre}' WHERE id = '${id}' RETURNING *`
        )
        return res.rows
    } catch (e) {
        console.log(e)
    }
}

async function deleteCanal(id) {
    try {
        const result = await pool.query(`DELETE FROM canales WHERE id = '${id}' RETURNING *`)
        return result.rowCount
    }catch (err) {
        return err
    }
}




module.exports = { nuevoCanal, getCanales, editCanal, deleteCanal }