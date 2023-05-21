const express = require("express");
const router = express.Router();
const product = require("../services/product");

router.get("/category", async function (req, res, next) {
  try {
    res.json(await product.getAllCategory());
  } catch (err) {
    console.error(`Error while getting products `, err.message);
    next(err);
  }
});

router.get("/category/:subCategory", async function (req, res, next) {
  try {
    res.json(await product.getAllSubCategory(req.params.subCategory));
  } catch (err) {
    console.error(`Error while getting products `, err.message);
    next(err);
  }
});

router.get("/category/:subCategory/:productId", async function (req, res, next) {
  try {
    res.json(await product.getMultiple(req.params.subCategory));
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