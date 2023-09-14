const express = require('express');
const router = express.Router();
const { fetchCarData } = require('../apiHELper');

router.post('/get-car-details', (req, res) => {
    const { 
        fuel_type, 
        drive, 
        cylinders, 
        transmission, 
        make, 
        model, 
        year, 
        'oil-ques': oil_ques, 
        'tire-ques': tire_ques 
    } = req.body;

    // Store each form input field in the session
    req.session.fuelType = fuel_type;
    req.session.drive = drive;
    req.session.cylinders = cylinders;
    req.session.transmission = transmission;
    req.session.make = make;
    req.session.model = model;
    req.session.year = year;
    req.session.oilQues = oil_ques;
    req.session.tireQues = tire_ques;

    // You can still use fetchCarData here if needed
    // Example:
    fetchCarData(model, function(error, response, body) {
        if (error) {
            console.error('Request failed:', error);
            return res.redirect('/profile');
        } else {
            // Store the fetched data in the session
            req.session.carData = body;
            // Redirect to the dashboard
            res.redirect('/');
        }
    });
});

module.exports = router;
