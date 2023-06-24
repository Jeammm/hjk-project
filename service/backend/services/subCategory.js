const db = require("./db");
const helper = require("../helper");
const config = require("../config");

const AppError = require("../utils/AppError");

const { query_gen } = require("../utils/query_gen");

exports.getAllProducts = async (subCategory, page = 1) => {
  const offset = helper.getOffset(page, config.listPerPage);

  const rows = await db.query(
    `SELECT DISTINCT
      *, Product.NameTH, Product.NameEN, Brand.NameTH AS BrandTH, Brand.NameEN AS BrandEN, (SELECT MIN(Size.Price) FROM Size WHERE Size.ProductID = Product.ProductID) AS MinPrice
    FROM 
      Product
    LEFT JOIN 
      Brand ON Brand.BrandID = Product.Brand
    WHERE 
      SubCategory = ?
    LIMIT ?, ?`,
    [subCategory, `${offset}`, `${config.listPerPage}`]
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
};

exports.getSubName = async (subcategoryId) => {
  const rows = await db.query(
    `SELECT *
    FROM SubCategory s
    JOIN Category c ON s.CategoryID = c.CategoryID
    WHERE s.SubCategoryID = ?`,
    [subcategoryId]
  );
  return {
    rows,
  };
};

exports.checkSubCategory = async (categoryId, subCategoryId) => {
  const rows = await db.query(
    `SELECT *
    FROM 
      SubCategory
    WHERE 
      CategoryID = ? AND SubCategoryID = ?`,
    [categoryId, subCategoryId]
  );
  return {
    rows,
  };
};

exports.getAllSubCategory = async (categoryId, p = 1) => {
  const offset = helper.getOffset(p, config.listPerPage);

  const rows = await db.query(
    `SELECT *
    FROM SubCategory 
    WHERE CategoryID = ?
    LIMIT ?, ?;`,
    [categoryId, `${offset}`, `${config.listPerPage}`]
  );
  return {
    rows,
  };
};

exports.createSubCategory = async (id, subCategoryData) => {
  try {
    const result = await db.query(
      `INSERT INTO SubCategory 
      (CategoryID, SubNameTH, SubNameEN, Thumbnail) 
      VALUES 
      (?, ?, ?, ?)`,
      [
        id,
        subCategoryData.SubNameTH,
        subCategoryData.SubNameEN || null,
        subCategoryData.Thumbnail || null,
      ]
    );
    return "New Sub-Category created successfully";
  } catch (e) {
    throw new AppError(e, 409);
  }
};

exports.editSubCategory = async (id, subCategoryData) => {
  try {
    const result = await db.query(
      `UPDATE SubCategory 
      SET 
        SubNameTH = ?, 
        SubNameEN = ?, 
        Thumbnail = ?
      WHERE SubCategoryID = ?`,
      [
        subCategoryData.SubNameTH,
        subCategoryData.SubNameEN || null,
        subCategoryData.Thumbnail || null,
        id,
      ]
    );
    return "Sub-Category updated successfully";
  } catch (e) {
    throw new AppError(e, 409);
  }
};

exports.search = async (q, p, b) => {
  const conditions = [];
  const param = [];

  if (q) {
    const queryStrings = q.split(" ");
    queryStrings.forEach((queryString) => {
      conditions.push(
        `(
          SubNameTH LIKE ? 
          OR SubNameEN LIKE ? 
          OR SubCategoryID LIKE ? 
        )`
      );
      param.push(`%${queryString}%`, `%${queryString}%`, `%${queryString}%`);
    });

    if (b) {
      const sub = await db.query(
        `
          SELECT Sub.SubCategoryID, Sub.CategoryID, Sub.Thumbnail, Sub.SubNameTH, Sub.SubNameEN, Sub.SubNameTH
          FROM Product p
          JOIN Brand b ON b.BrandID = p.Brand
          JOIN SubCategory Sub ON Sub.SubCategoryID = p.SubCategory
          WHERE ${conditions.join(" OR ")} AND p.Brand = ?
          `,
        [...param, b]
      );

      return {
        sub,
      };
    }

    const sub = await db.query(
      `
      SELECT Sub.SubCategoryID, Sub.CategoryID, Sub.Thumbnail, Sub.SubNameTH, Sub.SubNameEN, Sub.SubNameTH
      FROM SubCategory Sub
      WHERE ${conditions.join(" OR ")}
      `,
      param
    );

    return {
      sub,
    };
  }

  const sub = await db.query(
    `
      SELECT Sub.SubCategoryID, Sub.CategoryID, Sub.Thumbnail, Sub.SubNameTH, Sub.SubNameEN, Sub.SubNameTH
      FROM Product p
      JOIN SubCategory Sub ON Sub.SubCategoryID = p.SubCategory
      WHERE p.Brand = ?
      `,
    [b]
  );

  return {
    sub,
  };
};
