const LocalStrategy = require("passport-local").Strategy;
const db = require("../db/queries");
const bcrypt = require("bcryptjs");


const MyLocalStrategy = new LocalStrategy(async (username, password, done) => {
    try {
        const rows = await db.selectUserByName(username);
        const user = rows[0];
        if (!user) {
            return done(null, false, { message: "Incorrect username" });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return done(null, false, {message: "Incorrect password"})
        }
        return done(null, user)
    } catch (err) {
        return done(err);
    }
})

module.exports = {
    MyLocalStrategy
}