const express = require("express");
const path = require("path");

const route = express.Router();

route.get("/add-product", (req, res, next)=>{
    res.sendFile(path.join(__dirname, "..", "view", "admin/addProduct.html"));
});

route.post("/save-product", (req, res, next)=>{
    res.redirect("/admin/product");
})

route.get("/product", (req, res)=>{
    res.sendFile(path.join(__dirname, "..", "view", "admin/productList.html"));
})

module.exports = route;