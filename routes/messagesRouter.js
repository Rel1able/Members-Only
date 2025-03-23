const { Router } = require("express");
const messagesController = require("../controllers/messagesController");
const messagesRouter = Router();

messagesRouter.get("/createMessage",messagesController.renderCreateMessagesForm)
messagesRouter.post("/createMessage",messagesController.createMessage)


module.exports = messagesRouter