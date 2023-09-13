const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/checkNotAuthenticated");
const passport = require("passport");

router.get("/login", checkAuth, (req, res) => {
    res.render("login.ejs");
});
router.post(
    "/login",
    checkAuth,
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
        failureFlash: true,
    })
);

module.exports = router;
