const express = require("express");

const brand = require("../services/brand");

const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

exports.getAllBrands = catchAsync(async (req, res, next) => {
  const result = await brand.getAllBrands(req.query.page);
  const data = result.rows;

  res.status(200).json({
    status: "success",
    data,
  });
});

exports.getBrandItem = catchAsync(async (req, res, next) => {
  const result = await brand.getBrandItem(req.params.brandId, req.query.page);
  const data = result.rows;

  res.status(200).json({
    status: "success",
    data,
  });
});

exports.editBrand = catchAsync(async (req, res, next) => {
  const result = await brand.editBrand(req.params.brandId, req.body);
  const data = result;

  res.status(200).json({
    status: "success",
    data,
  });
});

exports.createBrand = catchAsync(async (req, res, next) => {
  const result = await brand.createBrand(req.body);
  const data = result;

  res.status(200).json({
    status: "success",
    data,
  });
});
