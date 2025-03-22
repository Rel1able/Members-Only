const { Router } = require("express");
const userController = require("../controllers/userController");

const userRouter = Router();

userRouter.get("/", userController.renderMainPage);

userRouter.get("/sign-up", userController.renderSignUpForm);
userRouter.post("/sign-up", userController.createUser)

module.exports = userRouter;