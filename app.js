const path = require("node:path");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const pgSession = require("connect-pg-simple")(session);
const pool = require("./db/pool");
const userRouter = require("./routes/userRouter");
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
app.use(express.urlencoded({ extended: false }));

app.use(userRouter);

app.listen(PORT, () => {
    console.log(`The app is running on port ${PORT}`)
})