const express = require("express");
const router = express.Router();
// const product = require("../services/product");
const productController = require("../controllers/productController");
const authController = require("../controllers/authController");

router
  .route("/category")
  .get(productController.getAllCategory)
  .post(authController.protect, productController.createCategory);

router.route("/checkcategory/:categoryId").get(productController.checkCategory);

router
  .route("/checkSubCategory/:categoryId/:subCategoryId")
  .get(productController.checkSubCategory);

router
  .route("/category/:categoryId")
  .get(productController.getAllSubCategory)
  .patch(authController.protect, productController.editCategory)
  .post(authController.protect, productController.createSubCategory);

router
  .route("/subCategory/:subCategoryId")
  .get(productController.getAllItemBySub)
  .patch(authController.protect, productController.editSubCategory)
  .post(authController.protect, productController.createProduct);

router
  .route("/product/:productId")
  .get(productController.getProduct)
  .patch(authController.protect, productController.editProduct);

router.route("/brands").get(productController.getAllBrands);

router.route("/brands/:brandId").get(productController.getBrandItem);

module.exports = router;
