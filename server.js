// server.js

const { fetchCarData } = require('./apiHELper');

const model = 'camry';

fetchCarData(model, function(error, response, body) {
    if(error) return console.error('Request failed:', error);
    else if(response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
    else console.log(body);
});


if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express');
const app = express();
const passport = require("passport");
const initializePassport = require("./config/passport-config");
const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require("method-override");
const PORT = process.env.PORT || 3001;

initializePassport(passport);

app.set("view-engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(flash());
app.use(
    session({
        name: "sid",
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + "/public"));

app.use(methodOverride("_method"));

const mainRoutes = require("./routes");
const registerRoutes = require("./routes/registerRoutes");
const loginRoutes = require("./routes/loginRoutes");
const logoutRoutes = require("./routes/logoutRoutes");
const navigationRoutes = require("./routes/navigationRoutes");
const profileRoutes = require("./routes/profileRoutes");


app.use(mainRoutes);
app.use(registerRoutes);
app.use(loginRoutes);
app.use(logoutRoutes);
app.use(navigationRoutes);

app.listen(PORT, () => {
    console.log(`Server is live at port ${PORT}`);
});
