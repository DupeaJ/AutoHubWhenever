const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const checkNotAuthenticated = require("../middleware/checkNotAuthenticated");
const db = require('../config/database.js');

router.get("/register", checkNotAuthenticated, (req, res) => {
    res.render("register.ejs");
});
router.post("/register", checkNotAuthenticated, async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 15);
        const newUser = {
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            //maybe add select car brand(autofill)make(autofill)year(or second table-with link id?)
        };
        db.query("INSERT INTO users SET ?", newUser, (err, result) => {
            if (err) throw err;
            res.redirect("/login");
        });
    } catch {
        res.redirect("/login");
    }
});

module.exports = router