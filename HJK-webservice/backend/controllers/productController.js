const express = require("express");
const product = require("../services/product");

const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

exports.getProduct = catchAsync(async (req, res, next) => {
  const result = await product.getProduct(req.params.productId);
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
    "source",
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
    "source",
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

exports.queryProduct = catchAsync(async (req, res, next) => {
  const result = await product.queryProduct(req.query.q, req.query.p);

  const data = result;

  res.status(200).json({
    status: "success",
    data,
  });
});

exports.delistProduct = catchAsync(async (req, res, next) => {
  const result = await product.delistProduct(req.params.productId, req.body.Available);

  const data = result;

  res.status(200).json({
    status: "success",
    data,
  });
})