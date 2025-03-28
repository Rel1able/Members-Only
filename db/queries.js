const pool = require("./pool");


async function createUser(username, password, firstName, lastName, status) {

    await pool.query("INSERT INTO users (username, password, firstname, lastname, status) VALUES ($1, $2, $3, $4, $5)", [
        username, password, firstName, lastName, status 
    ])

}

async function selectUserByName(username) {
    const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    return rows
}

async function selectUserById(id) {
    const {rows} = await pool.query("SELECT * FROM users WHERE id = $1", [id])
    return rows;
}

async function createMessage(message, userId) {
    const date = new Date();
    const { rows } = await pool.query("INSERT INTO messages (message, userid, created) VALUES ($1, $2, $3)", [
        message,
        userId,
        date
    
    ])
    return rows
}

async function getMessageData() {
    const { rows } = await pool.query("SELECT messages.id, messages.message, TO_CHAR(messages.created, 'dd/mm/yyyy'), users.username FROM messages INNER JOIN users ON messages.userId = users.id");
    return rows;
}

async function updateStatus() {
    await pool.query("UPDATE users SET status = $1", ["Club member"])
}

async function giveAdminStatus() {
    await pool.query("UPDATE users SET status = $1", ["Admin"]);
}

async function deleteMessage(messageId) {
    await pool.query("DELETE FROM messages WHERE messages.id = $1", [messageId])
}

module.exports = {
    createUser,
    selectUserByName,
    selectUserById,
    createMessage,
    getMessageData,
    updateStatus,
    giveAdminStatus,
    deleteMessage
    
}