const Product = require("../model/product");

module.exports.saveProduct = (req, res, next) => {
  const productData = req.body;
  const product = new Product(productData.productName, productData.productPrice, productData.productQuantity, productData.productDescription, productData.imageUrl);
  product.saveProduct((data)=>{
    // console.log("data written successfully", data);
    res.redirect("/admin/product");
  });
};

module.exports.getAllProducts = (req, res) => {
  try {
    Product.getProducts((products) => {
      res.render("admin/productList", { products });
    });
  } catch (err) {
    console.error("Error while fetching data: ", err);
    res.status(500).send("Internal Server Error");
  }
};