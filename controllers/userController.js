const db = require("../db/queries");
const bcrypt = require("bcryptjs");


async function renderMainPage(req, res) {
    res.render("index")
}

async function renderSignUpForm(req, res, next) {
    res.render("sign-up-form");
}

async function createUser(req, res, next) {
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
    createUser
}