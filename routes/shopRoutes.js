const express = require("express");
const shopsController = require("../controller/shopsController");

const router = express.Router();

router.get("/", shopsController.getShopProducts)

module.exports = router;