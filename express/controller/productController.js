const ProductModel = require("../schema/ProductSchema");

module.exports.getAllProduct = async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.status(200).json({
      status: "success",
      requestAt: req.requestAt,
      data: {
        product: products,
        total: products.length,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      requestAt: req.requestAt,
      message: err.message,
    });
  }
};

module.exports.getProductById = async (req, res) => {
  try {
    const productDetails = await ProductModel.findById(req.params.id);
    res.status(200).json({
      status: "success",
      requestedAt: req.requestedAt,
      data: productDetails,
    });
  } catch (err) {
    return res.status(400).json({
      status: "failed",
      requestedAt: req.requestedAt,
      message: err.message,
    });
  }
};

module.exports.createProduct = (req, res) => {
  new ProductModel(req.body)
    .save()
    .then((data) => {
      return res.status(201).json({
        status: "successs",
        requestedAt: req.requestedAt,
        data,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        status: "failed",
        requestedAt: req.requestedAt,
        message: err.message,
      });
    });
};

module.exports.updateProduct = async (req, res) => {
  try {
    const updateProduct = await ProductModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        runValidators: true, // ✅ This runs schema validations
        new: true, // Optional: returns the updated document
      }
    );
    res.status(200).json({
      status: "success",
      requestedAt: req.requestedAt,
      data: updateProduct,
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      requestedAt: req.requestedAt,
      message: err.message,
    });
  }
};
