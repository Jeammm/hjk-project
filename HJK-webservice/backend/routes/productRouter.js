const express = require("express");
const router = express.Router();
const product = require("../services/product");

router.get("/category", async function (req, res, next) {
  try {
    const data = await product.getAllCategory();
    res.json(data.rows);
  } catch (err) {
    console.error(`Error while getting products `, err.message);
    next(err);
  }
});

router.get("/checkcategory/:categoryId", async function (req, res, next) {
  try {
    const data = await product.checkCategory(req.params.categoryId);
    res.json(data.rows);
  } catch (err) {
    console.error(`Error while getting products `, err.message);
    next(err);
  }
});

router.get("/checkSubCategory/:categoryId/:subCategoryId", async function (req, res, next) {
  try {
    const data = await product.checkSubCategory(req.params.categoryId, req.params.subCategoryId);
    res.json(data.rows);
  } catch (err) {
    console.error(`Error while getting products `, err.message);
    next(err);
  }
});

router.get("/brands", async function (req, res, next) {
  try {
    const data = await product.getAllBrands();
    res.json(data.rows);
  } catch (err) {
    console.error(`Error while getting products `, err.message);
    next(err);
  }
});

router.get("/brands/:brandID", async function (req, res, next) {
  try {
    const data = await product.getBrandItem(req.params.brandID);
    res.json(data.rows);
  } catch (err) {
    console.error(`Error while getting products `, err.message);
    next(err);
  }
});

router.get("/category/:categoryID", async function (req, res, next) {
  try {
    const data = await product.getAllSubCategory(req.params.categoryID);
    res.json(data.rows);
  } catch (err) {
    console.error(`Error while getting products `, err.message);
    next(err);
  }
});

router.get("/subCategory/:subCategoryID", async function (req, res, next) {
  try {
    res.json(await product.getMultiple(req.params.subCategoryID));
  } catch (err) {
    console.error(`Error while getting products `, err.message);
    next(err);
  }
});

router.get("/product/:productID", async function (req, res, next) {
  try {
    res.json(await product.getProduct(req.params.productID));
  } catch (err) {
    console.error(`Error while getting products `, err.message);
    next(err);
  }
});

// getAllCategory
// getAllSubCategory
// getOneProduct

/* POST programming language */
router.post("/", async function (req, res, next) {
  try {
    res.json(await product.create(req.body));
  } catch (err) {
    console.error(`Error while creating product`, err.message);
    next(err);
  }
});

/* PUT programming language */
router.put("/:id", async function (req, res, next) {
  try {
    res.json(await product.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating product`, err.message);
    next(err);
  }
});

/* DELETE programming language */
router.delete("/:id", async function (req, res, next) {
  try {
    res.json(await product.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting product`, err.message);
    next(err);
  }
});

module.exports = router;
