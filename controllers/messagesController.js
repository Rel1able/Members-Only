const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

async function renderCreateMessagesForm(req, res) {
    console.log("User", req.user);
    res.render("create-message-form")
}

async function createMessage(req, res) {
    await db.createMessage(req.body.msg, req.user.id)
    res.redirect("/");
}

module.exports = {
    renderCreateMessagesForm,
    createMessage
}