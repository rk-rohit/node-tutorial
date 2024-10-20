const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/product.json");

module.exports = class Product {
  constructor(name, price, qty, description, imageUrl) {
    this.productName = name;
    this.productPrice = price;
    this.productQuantity = qty;
    this.productDescription = description;
    this.imageUrl = imageUrl;
  }

  saveProduct = (cb) => {
    fs.readFile(filePath, (err, content) => {
      if (err) {
        throw Error(err);
      }
      try {
        const productData = JSON.parse(content); // Parse JSON content
        let data = [];
        if (productData.length) {
          data = [...productData];
        }
        
        data.push({
          ...this,
          id: Math.random(),
        });

        fs.writeFile(filePath, JSON.stringify(data), (err) => {
          if (err) {
            throw Error(err);
          } else {
            cb(data);
          }
        });
      } catch (parseError) {
        throw Error(parseError);
      }
    });
  };

  static getProducts = (cb) => {
    fs.readFile(filePath, (err, content) => {
      if (err) {
        throw Error(err);
      }
      try {
        const data = JSON.parse(content); // Parse JSON content
        cb(data);
      } catch (parseError) {
        throw Error(parseError);
      }
    });
  };
};
