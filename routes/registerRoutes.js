const express = require("express");
const router = express.Router();
const checkNotAuthenticated = require("../middleware/checkNotAuthenticated");

const { User } = require("../models");

router.get("/register", checkNotAuthenticated, (req, res) => {
    res.render("register.ejs");
});

router.post("/register", checkNotAuthenticated, async (req, res) => {
    try {
        const newUser = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        };

        await User.create(newUser);
        res.redirect("/login");
    } catch (error) {
        console.error(error);
        res.redirect("/register");
    }
});

module.exports = router;
