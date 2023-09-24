const express = require("express");
const router = express.Router();
const checkAuthenticated = require("../middleware/checkAuthenticated");
const { CarDetail } = require("../models");

router.get("/", checkAuthenticated, async (req, res) => {
    try {
        const cars = await CarDetail.findAll({
            where: { userId: req.user.id },
        });

        res.render("index.ejs", {
            name: req.user ? req.user.name : "guest",
            carImage: req.user && req.user.carImage ? req.user.carImage : null,
            cars: cars || [],
        });
    } catch (error) {
        console.error("Error fetching cars:", error);
        res.render("index.ejs", {
            name: req.user ? req.user.name : "guest",
            carImage: req.user && req.user.carImage ? req.user.carImage : null,
            cars: [],
        });
    }
});


module.exports = router;
