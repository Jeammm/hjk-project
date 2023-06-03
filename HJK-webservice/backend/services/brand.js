const db = require("./db");
const helper = require("../helper");
const config = require("../config");

const AppError = require("../utils/AppError");

const { query_gen } = require("../utils/query_gen");

exports.getAllBrands = async () => {
  const rows = await db.query(
    `SELECT *
    FROM Brand`
  );
  return {
    rows,
  };
};

exports.getBrandItem = async (brandId) => {
  const rows = await db.query(
    `SELECT *
    FROM Product
    WHERE Brand = ?`,
    [brandId]
  );
  return {
    rows,
  };
};

exports.createBrand = async (brandData) => {
  try {
    const result = await db.query(
      `INSERT INTO Brand
      (NameTH, NameEN, Logo) 
      VALUES 
      (?, ?, ?)`,
      [brandData.NameTH, brandData.NameEN || null, brandData.Logo || null]
    );
    return "New Brand created successfully";
  } catch (e) {
    throw new AppError(e, 409);
  }
};

exports.editBrand = async (id, brandData) => {
  try {
    const result = await db.query(
      `UPDATE Brand 
      SET 
        NameTH = ?,
        NameEN = ?,
        Logo = ?
      WHERE 
        BrandID = ?`,
      [brandData.NameTH, brandData.NameEN, brandData.Logo, id]
    );
    return "Brand updated successfully";
  } catch (e) {
    throw new AppError(e, 409);
  }
};
