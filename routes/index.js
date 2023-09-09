const express = require('express');
const router = express.Router();
const checkAuthenticated  = require('../middleware/checkAuthenticated');

router.get("/", checkAuthenticated, (req, res) => {
    console.log(req.user);
    res.render("index.ejs", { name: req.user ? req.user.name : "guest" });
});

module.exports = router;