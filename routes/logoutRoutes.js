const express = require("express");
const router = express.Router();

router.post("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.redirect("/");
        }
        res.clearCookie("sid");
        res.redirect("/login");
    });
});

module.exports = router;