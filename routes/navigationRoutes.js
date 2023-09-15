const express = require("express");
const checkAuthenticated = require("../middleware/checkAuthenticated");
const router = express.Router();
// sophia update urls 
const videodata = [
    {
        title: "How to Change your Oil in less than 5 mins",
        url: "https://www.youtube.com/embed/rYWcL76WMRg?si=by1C0TqHus_EMZ7q",
    },
    {
        title: "How to change a tire",
        url: "https://www.youtube.com/embed/0KDMdYww4VE?si=mYrX_PDvxZx5gt2y",
    },
    {
        title: "How to jumpstart a car",
        url: "https://www.youtube.com/embed/hyLwfthYjKw?si=ovMd7NWkLdkzR2eK",
    },
    {
        title: "How to drive a manual transmission in 1 minute",
        url: "https://www.youtube.com/embed/UsOcXG2v3EE?si=PP9ppfwZaNyYthze",
    },
];
// instead of an array do a db query to select all from video 
router.get("/library", checkAuthenticated, async (req, res) => {
    res.render("library.ejs", {
        videodata, length: videodata.length});
});
router.post("/library", checkAuthenticated, async (req, res) => {
    try {
        console.log(req.body);
    } catch {
        res.redirect("/");
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
