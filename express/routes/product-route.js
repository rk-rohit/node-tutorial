const {
  getAllProduct,
  getProductById,
  updateProduct,
  createProduct,
} = require("../controller/productController");

const express = require("express");
const router = express.Router();

// router.param("id", validateId)

router.get("/", getAllProduct);

router.get("/:id", getProductById);

router.post("/", createProduct);

router.patch("/:id", updateProduct);

module.exports = router;
