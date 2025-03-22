const pool = require("./pool");


async function createUser(username, password, firstName, lastName, status) {
    const rows = await pool.query("INSERT INTO users (username, password, firstname, lastname, status) VALUES ($1, $2, $3, $4, $5)", [
        username, password, firstName, lastName, status 
    ])
    return rows;
}

module.exports = {
    createUser
}