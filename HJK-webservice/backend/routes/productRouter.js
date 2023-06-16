const express = require("express");
const router = express.Router();
// const product = require("../services/product");
const categoryController = require("../controllers/categoryController");
const subCategoryController = require("../controllers/subCategoryController");
const productController = require("../controllers/productController");
const brandController = require("../controllers/brandController");
const searchController = require("../controllers/searchController");

const authController = require("../controllers/authController");

router
  .route("/category")
  .get(categoryController.getAllCategory)
  .post(authController.protect, categoryController.createCategory);

router
  .route("/checkcategory/:categoryId")
  .get(categoryController.checkCategory);

router
  .route("/checkSubCategory/:categoryId/:subCategoryId")
  .get(subCategoryController.checkSubCategory);

router
  .route("/getSubName/:subCategoryId")
  .get(subCategoryController.getSubName);

router
  .route("/category/:categoryId")
  .get(subCategoryController.getAllSubCategory)
  .patch(authController.protect, categoryController.editCategory)
  .post(authController.protect, subCategoryController.createSubCategory);

router
  .route("/subCategory/:subCategoryId")
  .get(subCategoryController.getSubById)
  .patch(authController.protect, subCategoryController.editSubCategory)
  .post(authController.protect, productController.createProduct);

router
  .route("/product/:productId")
  .get(productController.getProduct)
  .patch(authController.protect, productController.editProduct)
  .put(authController.protect, productController.delistProduct)
  

router.route("/products").get(productController.queryProduct);

router.route("/search").get(searchController.search);

router
  .route("/brands")
  .get(brandController.getAllBrands)
  .post(authController.protect, brandController.createBrand);

router
  .route("/brands/:brandId")
  .get(brandController.getBrandItem)
  .patch(authController.protect, brandController.editBrand);

module.exports = router;
