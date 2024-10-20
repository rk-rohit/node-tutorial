const Product = require("../model/product");

module.exports.getShopProducts = (req, res, next) => {
  try {
    Product.getProducts((products) => {
      res.render("productList", { products });
    });
  } catch (err) {
    console.error("Error while fetching data: ", err);
    res.status(500).send("Internal Server Error");
  }
};
