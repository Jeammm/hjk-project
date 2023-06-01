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

exports.getSubName = catchAsync(async (req, res, next) => {
  const result = await product.getSubName(req.params.subCategoryId);
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
  const result = await product.getAllSubCategory(
    req.params.categoryId,
    req.query.page
  );
  const data = result.rows;

  res.status(200).json({
    status: "success",
    data,
  });
});

exports.getAllItemBySub = catchAsync(async (req, res, next) => {
  const result = await product.getMultiple(
    req.params.subCategoryId,
    req.query.page
  );
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
  const desiredKeys = [
    "NameTH",
    "NameEN",
    "Thumbnail",
    "DesTH",
    "DesEN",
    "Brand",
    "IsColor",
    "SubCategory",
  ];

  const detail = {};
  const sizing = {};

  for (const key in req.body) {
    if (desiredKeys.includes(key)) {
      detail[key] = req.body[key];
    } else {
      sizing[key] = req.body[key];
    }
  }

  const transformedSizing = {};

  for (const key in sizing) {
    const [id, prop] = key.split("_");
    const lastTwoDigits = id;

    if (!transformedSizing[lastTwoDigits]) {
      transformedSizing[lastTwoDigits] = {};
    }

    transformedSizing[lastTwoDigits][prop] = sizing[key];
  }

  const resultDetail = await product.createProduct(
    req.params.subCategoryId,
    detail
  );

  const newProduct = await product.getProductByName(req.body.NameTH);
  const productId = newProduct.product[0].ProductID;

  const resultSize = await product.editSize(productId, transformedSizing);

  const data = [resultDetail, resultSize];

  res.status(200).json({
    status: "success",
    data,
    productId,
  });
});

exports.editProduct = catchAsync(async (req, res, next) => {
  const desiredKeys = [
    "NameTH",
    "NameEN",
    "Thumbnail",
    "DesTH",
    "DesEN",
    "Brand",
    "IsColor",
    "Available",
  ];

  const detail = {};
  const sizing = {};

  for (const key in req.body) {
    if (desiredKeys.includes(key)) {
      detail[key] = req.body[key];
    } else {
      sizing[key] = req.body[key];
    }
  }

  const transformedSizing = {};

  for (const key in sizing) {
    const [id, prop] = key.split("_");
    const lastTwoDigits = id.slice(-2);

    if (!transformedSizing[lastTwoDigits]) {
      transformedSizing[lastTwoDigits] = {};
    }

    transformedSizing[lastTwoDigits][prop] = sizing[key];
  }

  const resultDetail = await product.editProduct(req.params.productId, detail);
  const resultSize = await product.editSize(
    req.params.productId,
    transformedSizing
  );
  const data = [resultDetail, resultSize];

  res.status(200).json({
    status: "success",
    data,
  });
});

exports.editBrand = catchAsync(async (req, res, next) => {
  const result = await product.editBrand(req.params.brandId, req.body);
  const data = result;

  res.status(200).json({
    status: "success",
    data,
  });
});

exports.createBrand = catchAsync(async (req, res, next) => {
  const result = await product.createBrand(req.body);
  const data = result;

  res.status(200).json({
    status: "success",
    data,
  });
});

exports.queryProduct = catchAsync(async (req, res, next) => {
  const result = await product.queryProduct(req.query.q, req.query.p);

  const data = result;

  res.status(200).json({
    status: "success",
    data,
  });
});
