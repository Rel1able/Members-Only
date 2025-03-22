const db = require("../db/queries");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");


async function renderMainPage(req, res) {
    res.render("index")
}



const validateSignUpForm = [
    body("username")
        .trim()
        .isLength({ min: 1, max: 15 }).withMessage("Username must be between 1 and 15 characters"),
    body("firstName")
        .trim()
        .isLength({ min: 1, max: 15 }).withMessage("First name must be between 1 and 15 characters"),
    body("lastName")
        .trim()
        .isLength({ min: 1, max: 15 }).withMessage("Last name must be between 1 and 15 characters"),
    body("password")
        .isLength({ min: 5 }).withMessage("Password must be at least 5 characters long"),
    body("confPassword").custom((value, { req }) => {
        console.log(req.body);
        if (!req.body.password) {
            throw new Error("Password field is required");
        }
        if (req.body.password.length < 5) {
            throw new Error("Confirmed password must be the same length as the password and at least 5 characters long");
        }
        if (value !== req.body.password) {
            throw new Error("Passwords doesn't match");
        }
        return true
    })

]
async function renderSignUpForm(req, res, next) {
    res.render("sign-up-form");
}

async function createUser(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).render("sign-up-form", {
            errors: errors.array(),
        })
    }

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await db.createUser( req.body.username, hashedPassword, req.body.firstName, req.body.lastName, "none")
        res.redirect("/");
    }catch(err){
        return next(err);
    }
}

module.exports = {
    renderMainPage,
    renderSignUpForm,
    createUser,
    validateSignUpForm
}