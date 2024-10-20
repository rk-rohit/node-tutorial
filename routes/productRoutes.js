const express = require("express");
const fs = require("fs");
const path = require("path");

const route = express.Router();

route.get("/add-product", (req, res, next) => {
  res.render("admin/addProduct");
});

route.post("/save-product", (req, res, next) => {
  const productData = req.body;
  const filePath = path.join(__dirname, "../data/product.json");

  fs.readFile(filePath, (err, content) => {
    if (err) {
      console.error("Error reading file:", err);
      res.status(500).send("Internal Server Error!");
    }

    try {
      let data = JSON.parse(content);
      if (data.length) {
        data.push({
          ...productData,
          id: Math.random(),
        });
      } else {
        data = [
          {
            ...productData,
            id: Math.random(),
          },
        ];
      }

      fs.writeFile(filePath, JSON.stringify(data), (err) => {
        if (err) {
          console.error("Error while writing data:", err);
        } else {
          console.log("data written successfully", data);
          res.redirect("/admin/product");
        }
      });
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError);
      res.status(500).send("Internal Server Error!");
    }
  });
});

route.get("/product", (req, res) => {
  const filePath = path.join(__dirname, "../data/product.json");
  fs.readFile(filePath, (err, content) => {
    // Specify encoding to read as string
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).send("Internal Server Error"); // Send a 500 error if the file read fails
    }
    try {
      const data = JSON.parse(content); // Parse JSON content
      res.render("admin/productList", { products: data });
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError);
      return res.status(500).send("Internal Server Error"); // Send a 500 error if JSON parsing fails
    }
  });
});

module.exports = route;
