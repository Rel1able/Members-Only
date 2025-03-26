const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

async function renderCreateMessagesForm(req, res) {
    res.render("create-message-form")
}

const validateCreateMessageForm = [
    body("msg")
        .trim()
        .isLength({min: 10, max: 100}).withMessage("Message must be between 10 and 100 characters long")
]

async function createMessage(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).render("create-message-form", {
             errors: errors.array(),
         })
    }
    await db.createMessage(req.body.msg, req.user.id)
    res.redirect("/");
}

async function deleteMessage(req, res) {
    const messageId = req.params.messageId;
    await db.deleteMessage(messageId);
    res.redirect("/");
}

module.exports = {
    renderCreateMessagesForm,
    createMessage,
    validateCreateMessageForm,
    deleteMessage
}