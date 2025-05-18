const {
  getAllProduct,
  getProductById,
  updateProduct,
  createProduct,
  validateId,
} = require("../controller/productController");

const express = require("express");
const router = express.Router();

router.param("id", validateId)

router.get("/", getAllProduct);

router.get("/:id", getProductById);

router.post("/", createProduct);

router.put("/:id", updateProduct);

module.exports = router;
