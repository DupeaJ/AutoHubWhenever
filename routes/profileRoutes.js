const express = require("express");
const router = express.Router();
const { CarDetail } = require("../models");

router.post("/get-car-details", async (req, res) => {
    const { make, model, productionYear } = req.body;

    try {
        const carDetail = await CarDetail.create({
            userId: req.user.id, 
            make,
            model,
            productionYear,
        });

        res.redirect("/");
    } catch (error) {
        console.error("Database error", error);
        req.flash("error", "Failed to save car details. Please try again.");
        res.redirect("/profile");
    }
});

module.exports = router;
