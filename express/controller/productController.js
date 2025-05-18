const fs = require("fs");

const product = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/product.json`)
);

module.exports.getAllProduct = (req, res) => {
  return res.status(200).json({
    status: "success",
    requestedAt: req.requestedAt,
    data: {
      total: product.length,
      product,
    },
  });
};

module.exports.getProductById = (req, res) => {
  const productInfo = product.find((item) => item.id == req.params.id);
  if (productInfo) {
    return res.status(200).json({
      status: "success",
      requestedAt: req.requestedAt,
      data: {
        product: productInfo,
      },
    });
  } else {
    return res.status(400).json({
      status: "failed",
      requestedAt: req.requestedAt,
      message: "Id invalid or not found!",
    });
  }
};

module.exports.createProduct = (req, res) => {
  req.body.id = product.length + 1;
  product.push(req.body);
  fs.writeFile(
    `${__dirname}/../data/product.json`,
    JSON.stringify(product),
    "utf-8",
    (err) => {
      if (err) {
        return res.status(404).json({
          status: "failed",
          requestedAt: req.requestedAt,
          message: err.message,
        });
      } else {
        return res.status(201).json({
          status: "successs",
          requestedAt: req.requestedAt,
          data: {
            product: req.body,
          },
        });
      }
    }
  );
};

module.exports.updateProduct = (req, res) => {
  let productIndex = product.findIndex((item) => item.id == req.params.id);
  if (productIndex >= 0) {
    product[productIndex] = {
      ...product[productIndex],
      ...req.body,
    };
    fs.writeFile(
      `${__dirname}/../data/product.json`,
      JSON.stringify(product),
      "utf-8",
      (err) => {
        if (err) {
          return res.status(404).json({
            status: "failed",
            requestedAt: req.requestedAt,
            message: err.message,
          });
        } else {
          return res.status(200).json({
            status: "success",
            requestedAt: req.requestedAt,
            data: {
              product: product[productIndex],
            },
          });
        }
      }
    );
  } else {
    return res.status(400).json({
      status: "failed",
      requestedAt: req.requestedAt,
      message: "Id invalid or not found!",
    });
  }
};

module.exports.validateId = (req, res, next, val)=>{
  if (val > product.length) {
    return res.status(400).json({
      status: "failed",
      requestedAt: req.requestedAt,
      message: "Id invalid or not found!",
    });
  } else
  next();
}