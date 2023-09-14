// server.js

let profileData = {};

const { fetchCarData } = require('./apiHELper');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const { google } = require("googleapis");
const { fetchCarData } = require("./apiHELper");

const youtube = google.youtube({
    version: 'v3',
    auth: process.env.YOUTUBE_API_KEY
});

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
app.use(profileRoutes);

app.post('/get-car-details', (req, res) => {
    const { make, model, year } = req.body;
    
    fetchCarData(model, (error, response, body) => {
        if (error) {
            console.error('Request failed:', error);
            res.send('Error fetching car data.');
        } else if (response.statusCode !== 200) {
            console.error('Error:', response.statusCode, body.toString('utf8'));
            res.send('Error fetching car data.');
        } else {
            const carData = JSON.parse(body);
            
            // Store user input in session variables
            req.session.fuelType = req.body.fuel_type;
            req.session.drive = req.body.drive;
            req.session.cylinders = req.body.cylinders;
            req.session.transmission = req.body.transmission;
            req.session.make = req.body.make;
            req.session.model = req.body.model;
            req.session.year = req.body.year;
            req.session.oilQues = req.body['oil-ques'];
            req.session.tireQues = req.body['tire-ques'];
            
            // Now, render main page and pass the fetched car data and session data:
            res.render('main', {
                carData: carData,
                fuelType: req.session.fuelType,
                drive: req.session.drive,
                cylinders: req.session.cylinders,
                transmission: req.session.transmission,
                make: req.session.make,
                model: req.session.model,
                year: req.session.year,
                oilQues: req.session.oilQues,
                tireQues: req.session.tireQues,
            });
        }
    });
});



app.listen(PORT, () => {
    console.log(`Server is live at port ${PORT}`);
});
