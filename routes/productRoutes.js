const express = require("express");
const productController = require("../controller/productController");

const route = express.Router();

route.get("/add-product", (req, res, next) => {
  res.render("admin/addProduct");
});

route.post("/save-product", productController.saveProduct);

route.get("/product", productController.getAllProducts);

module.exports = route;
