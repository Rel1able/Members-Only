const path = require("node:path");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const {MyLocalStrategy} = require("./config/passport");
const pgSession = require("connect-pg-simple")(session);
const pool = require("./db/pool");
const db = require("./db/queries");
const userRouter = require("./routes/userRouter");
const messagesRouter = require("./routes/messagesRouter");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8000;
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.use(session({
    store: new pgSession({
        pool: pool,
        tableName: "session",
    }),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
})

app.use(userRouter);
app.use(messagesRouter);
passport.use(MyLocalStrategy);

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser(async (id, done) => {
    try {
        const rows = await db.selectUserById(id);
        const user = rows[0];
        
        done(null, user);
    } catch (err) {
        done(err);
    }
})

app.listen(PORT, () => {
    console.log(`The app is running on port ${PORT}`)
})