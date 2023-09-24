// server.js
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const express = require('express');
const app = express();
const { searchYouTube } = require('./config/youtubeAPI');

const passport = require("passport");
const initializePassport = require("./config/passport-config");
const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require("method-override");
const PORT = process.env.PORT || 3001;
const youtubeApiKey = process.env.YOUTUBE_API_KEY;

const { google } = require('googleapis');
const youtube = google.youtube({
    version: 'v3',
    auth: youtubeApiKey,
});

app.get("/search-with-googleapis", async (req, res, next) => {
    try {
        const searchQuery = req.query.search_query;
        const titles = await searchYouTube(searchQuery);
        res.send(titles);
    } catch (err) {
        next(err);
    }
});

initializePassport(passport);

app.set("view engine", "ejs");
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
const youtubeRoutes = require("./routes/youtubeRoutes");

app.use(mainRoutes);
app.use(registerRoutes);
app.use(loginRoutes);
app.use(logoutRoutes);
app.use(navigationRoutes);
app.use(profileRoutes);
app.use(youtubeRoutes);

app.listen(PORT, () => {
    console.log(`Server is live at port ${PORT}`);
});