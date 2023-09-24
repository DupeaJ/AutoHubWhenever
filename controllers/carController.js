const carModel = require("../models/carModel.js");
module.exports = {
    addCarDetails: async function (req, res) {
        try {
            let carDetails = req.body;
            carDetails.user_id = req.user.id;
            let result = await carModel.addUserCar(carDetails);
            res.status(200).send(result);
        } catch (err) {
            console.error(err);
            res.status(500).send(err.message);
        }
    },
    getUserCarData: async function (req, res) {
        
    }
};