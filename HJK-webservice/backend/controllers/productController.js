const express = require('express');

const product = require("../services/product"); 

const router = express.Router();

exports.getAllCategory = async (req, res, next) => {
  try {
    const data = await product.getAllCategory();
    res.json(data.rows);
  } catch (err) {
    console.error(`Error while getting products `, err.message);
    next(err);
  }
}

exports.checkCategory = async (req, res, next) => {
  try {
    const data = await product.checkCategory(req.params.categoryId);
    res.json(data.rows);
  } catch (err) {
    console.error(`Error while getting products `, err.message);
    next(err);
  }
}

exports.checkSubCategory = async (req, res, next) => {
  try {
    const data = await product.checkSubCategory(req.params.categoryId, req.params.subCategoryId);
    res.json(data.rows);
  } catch (err) {
    console.error(`Error while getting products `, err.message);
    next(err);
  }
}

exports.getAllBrands = async (req, res, next) => {
  try {
    const data = await product.getAllBrands();
    res.json(data.rows);
  } catch (err) {
    console.error(`Error while getting products `, err.message);
    next(err);
  }
}

exports.getBrandItem = async (req, res, next) => {
  try {
    const data = await product.getBrandItem(req.params.brandID);
    res.json(data.rows);
  } catch (err) {
    console.error(`Error while getting products `, err.message);
    next(err);
  }
}

exports.getAllSubCategory = async (req, res, next) => {
  try {
    const data = await product.getAllSubCategory(req.params.categoryID);
    res.json(data.rows);
  } catch (err) {
    console.error(`Error while getting products `, err.message);
    next(err);
  }
}

exports.getAllItemBySub = async (req, res, next) => {
  try {
    res.json(await product.getMultiple(req.params.subCategoryID));
  } catch (err) {
    console.error(`Error while getting products `, err.message);
    next(err);
  }
}

exports.getProduct = async (req, res, next) => {
  try {
    res.json(await product.getProduct(req.params.productID));
  } catch (err) {
    console.error(`Error while getting products `, err.message);
    next(err);
  }
}

exports.createCategory = async (req, res, next) => {
  try {
    res.json(await product.createCategory(req.body));
  } catch (err) {
    console.error(`Error while creating category`, err.message);
    next(err);
  }
}

exports.editCategory = async (req, res, next) => {
  try {
    res.json(await product.editCategory(req.params.categoryId, req.body));
  } catch (err) {
    console.error(`Error while editing category`, err.message);
    next(err);
  }
}

exports.createSubCategory = async (req, res, next) => {
  try {
    res.json(await product.createSubCategory(req.params.categoryId, req.body));
  } catch (err) {
    console.error(`Error while creating sub-category`, err.message);
    next(err);
  }
}

exports.editSubCategory = async (req, res, next) => {
  try {
    res.json(
      await product.editSubCategory(req.params.subcategoryId, req.body)
    );
  } catch (err) {
    console.error(`Error while editing sub-category`, err.message);
    next(err);
  }
}

exports.createProduct = async (req, res, next) => {
  try {
    res.json(await product.createProduct(req.params.subcategoryId, req.body));
  } catch (err) {
    console.error(`Error while creating product`, err.message);
    next(err);
  }
}

exports.editProduct = async (req, res, next) => {
  try {
    res.json(await product.editProduct(req.params.productId, req.body));
  } catch (err) {
    console.error(`Error while editing product`, err.message);
    next(err);
  }
}
