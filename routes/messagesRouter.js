const { Router } = require("express");
const messagesController = require("../controllers/messagesController");
const messagesRouter = Router();

messagesRouter.get("/createMessage",messagesController.renderCreateMessagesForm)
messagesRouter.post("/createMessage", messagesController.validateCreateMessageForm, messagesController.createMessage)

messagesRouter.post("/delete/:messageId", messagesController.deleteMessage)

module.exports = messagesRouter