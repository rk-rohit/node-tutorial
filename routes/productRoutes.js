const express = require("express");
const path = require("path");

const route = express.Router();

route.get("/add-product", (req, res, next)=>{
    res.render("admin/addProduct");
});

route.post("/save-product", (req, res, next)=>{
    res.redirect("/admin/product");
})

route.get("/product", (req, res)=>{
    res.render("admin/productList");
})

module.exports = route;