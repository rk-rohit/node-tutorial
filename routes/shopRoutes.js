const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

router.get("/", (req, res, next)=>{
    const filePath = path.join(__dirname, "../data/product.json");
    fs.readFile(filePath, (err, content)=>{
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).send("Internal Server Error");
        }

        try {
            const data = JSON.parse(content);
            res.render("productList", { products: data || []});
        } catch(parseError) {
            console.error("error while parsing data", parseError);
            res.status(500).send("Internal Server Error");
        }
    });
})

module.exports = router;