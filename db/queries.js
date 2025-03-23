const pool = require("./pool");


async function createUser(username, password, firstName, lastName, status) {
    const rows = await pool.query("INSERT INTO users (username, password, firstname, lastname, status) VALUES ($1, $2, $3, $4, $5)", [
        username, password, firstName, lastName, status 
    ])
    return rows;
}

async function selectUserByName(username) {
    const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    return rows
}

async function selectUserById(id) {
    const {rows} = await pool.query("SELECT * FROM users WHERE id = $1", [id])
    return rows;
}

module.exports = {
    createUser,
    selectUserByName,
    selectUserById
    
}