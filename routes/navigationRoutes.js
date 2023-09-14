const express = require("express");
const checkAuthenticated = require("../middleware/checkAuthenticated");
const router = express.Router();
//const library = require("../views/library.ejs");

router.get("/library", checkAuthenticated, async (req, res) => {
    res.render("library.ejs");
});
router.post("/library", checkAuthenticated, async (req, res) => {
    try {
        console.log(req.body);
    } catch {
        res.redirect("/index");
    }
});

router.get("/profile", checkAuthenticated, async (req, res) => {
    res.render("profile.ejs");
});

router.post("/profile", checkAuthenticated, async (req, res) => {
    try {
        console.log(req.body);
    } catch {
        res.redirect("/index");
    }
});
module.exports = router;
