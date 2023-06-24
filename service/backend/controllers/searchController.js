const express = require("express");
const product = require("../services/product");
const category = require("../services/category");
const subCategory = require("../services/subCategory");

const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

exports.search = catchAsync(async (req, res, next) => {
  const prod = await product.search(req.query.q, req.query.p);
  const cat = await category.search(req.query.q, req.query.p);
  const sub = await subCategory.search(req.query.q, req.query.p);

  const data = {
    product: prod.product,
    category: cat.category,
    subCategory: sub.sub,
  };

  res.status(200).json({
    status: "success",
    data,
  });
});
