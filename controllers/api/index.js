const router = require('express').Router();
const authController = require("./authController");

router.get("/auth", authController);

module.exports = router;

