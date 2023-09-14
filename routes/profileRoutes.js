const express = require('express');
const router = express.Router();
const { fetchCarData } = require('../apiHELper');

router.post('/get-car-details', (req, res) => {
    const model = req.body.model;

    fetchCarData(model, function(error, response, body) {
        if (error) {
            console.error('Request failed:', error);
            return res.redirect('/profile');
        } 
        else {
            // Store the fetched data in the session
            req.session.carData = body;
            // Redirect to the dashboard
            res.redirect('/');
        }
    });
});

module.exports = router;