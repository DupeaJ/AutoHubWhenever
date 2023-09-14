const express = require('express');
const router = express.Router();
const { fetchCarData } = require('../apiHELper');

router.post('/get-car-details', (req, res) => {
    const model = req.body.model;

    fetchCarData(model, function(error, response, body) {
        if(error) {
            console.error('Request failed:', error);
            return res.redirect('/profile');
        } 
        else {
            res.send(body);
        }
    });
});

module.exports = router;
