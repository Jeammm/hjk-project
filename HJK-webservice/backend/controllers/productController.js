const express = require("express");

const product = require("../services/product");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

const router = express.Router();

exports.getAllCategory = catchAsync(async (req, res, next) => {
  const result = await product.getAllCategory();
  const data = result.rows;
  res.status(200).json({
    status: "success",
    data,
  });
});

exports.checkCategory = catchAsync(async (req, res, next) => {
  const result = await product.checkCategory(req.params.categoryId);
  const data = result.rows;
  if (data.length === 0) {
    return next(new AppError("No Category found with prodivded ID", 404));
  }

  res.status(200).json({
    status: "success",
    data,
  });
});

exports.checkSubCategory = catchAsync(async (req, res, next) => {
  const result = await product.checkSubCategory(
    req.params.categoryId,
    req.params.subCategoryId
  );

  const data = result.rows;
  if (data.length === 0) {
    return next(new AppError("No Sub-Category found with prodivded ID", 404));
  }

  res.status(200).json({
    status: "success",
    data,
  });
});

exports.getAllBrands = catchAsync(async (req, res, next) => {
  const result = await product.getAllBrands();
  const data = result.rows;

  res.status(200).json({
    status: "success",
    data,
  });
});

exports.getBrandItem = catchAsync(async (req, res, next) => {
  const result = await product.getBrandItem(req.params.brandId);
  const data = result.rows;

  res.status(200).json({
    status: "success",
    data,
  });
});

exports.getAllSubCategory = catchAsync(async (req, res, next) => {
  const result = await product.getAllSubCategory(req.params.categoryId);
  const data = result.rows;

  res.status(200).json({
    status: "success",
    data,
  });
});

exports.getAllItemBySub = catchAsync(async (req, res, next) => {
  const result = await product.getMultiple(req.params.subCategoryId);
  const data = result.data;

  res.status(200).json({
    status: "success",
    data,
  });
});

exports.getProduct = catchAsync(async (req, res, next) => {
  const result = await product.getProduct(req.params.productId);
  const data = result;

  res.status(200).json({
    status: "success",
    data,
  });
});

exports.createCategory = catchAsync(async (req, res, next) => {
  console.log(req.body)
  const result = await product.createCategory(req.body);

  const data = result;

  res.status(200).json({
    status: "success",
    data,
  });
});

exports.editCategory = catchAsync(async (req, res, next) => {
  const result = await product.editCategory(req.params.categoryId, req.body);
  const data = result;

  res.status(200).json({
    status: "success",
    data,
  });
});

exports.createSubCategory = catchAsync(async (req, res, next) => {
  const result = await product.createSubCategory(
    req.params.categoryId,
    req.body
  );
  const data = result;

  res.status(200).json({
    status: "success",
    data,
  });
});

exports.editSubCategory = catchAsync(async (req, res, next) => {
  
  const result = await product.editSubCategory(
    req.params.subCategoryId,
    req.body
  );
  const data = result;

  res.status(200).json({
    status: "success",
    data,
  });
});

exports.createProduct = catchAsync(async (req, res, next) => {
  const result = await product.createProduct(
    req.params.subCategoryId,
    req.body
  );
  const data = result;

  res.status(200).json({
    status: "success",
    data,
  });
});

exports.editProduct = catchAsync(async (req, res, next) => {
  const result = await product.editProduct(req.params.productId, req.body);
  const data = result;

  res.status(200).json({
    status: "success",
    data,
  });
});
