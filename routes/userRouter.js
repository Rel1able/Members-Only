const { Router } = require("express");
const userController = require("../controllers/userController");
const userRouter = Router();
const passport = require("passport");

userRouter.get("/", userController.renderMainPage);

userRouter.get("/sign-up", userController.renderSignUpForm);
userRouter.post("/sign-up",userController.validateSignUpForm, userController.createUser)

userRouter.get("/log-in", userController.renderLogInForm);
userRouter.post("/log-in", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/sign-up"
}))

userRouter.get("/join-club",userController.renderJoinClubForm)
userRouter.post("/join-club", userController.joinTheClub)

userRouter.get("/become-admin", userController.renderBecomeAdminForm);
userRouter.post("/become-admin", userController.giveAdminStatus)

userRouter.get("/log-out",userController.handleLogOut )

module.exports = userRouter;