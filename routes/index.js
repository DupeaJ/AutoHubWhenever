const express = require('express');
const router = express.Router();
const checkAuthenticated = require('../middleware/checkAuthenticated');

router.get("/", checkAuthenticated, (req, res) => {
    console.log(req.user);
    res.render("index.ejs", {
        name: req.user ? req.user.name : "guest",
        carImage: req.user && req.user.carImage ? req.user.carImage : null,
    });
});


module.exports = router;