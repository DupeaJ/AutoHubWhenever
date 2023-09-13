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

// router.get("/profile", (req, res) => {
//     if (err) {
//         return res.redirect("/");
//     }
//     res.render("profile.ejs");
// });

module.exports = router;
