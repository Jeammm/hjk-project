const db = require("./db");
const helper = require("../helper");
const config = require("../config");

const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

const { query_gen } = require("../utils/query_gen");

exports.getProduct = async (productId) => {
  const product = await db.query(
    `SELECT * 
    FROM Product 
    WHERE ProductID = ?`,
    [productId]
  );

  const size = await db.query(
    `SELECT * 
    FROM Size 
    WHERE ProductID = ?`,
    [productId]
  );

  return {
    product,
    size,
  };
};

exports.getProductByName = async (productName) => {
  const product = await db.query(
    `SELECT * 
    FROM Product 
    WHERE NameTH = ?`,
    [productName]
  );

  return {
    product,
  };
};

exports.createProduct = async (id, productData) => {
  try {
    const result = await db.query(
      `INSERT INTO Product 
      (NameTH, NameEN, Thumbnail, DesTH, DesEN, Brand, IsColor, SubCategory, source)
      VALUES 
      (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        productData.NameTH || null,
        productData.NameEN || null,
        productData.Thumbnail || null,
        productData.DesTH || null,
        productData.DesEN || null,
        productData.Brand || null,
        productData.IsColor || 0,
        id,
        productData.source || null,
      ]
    );

    return "New product detail inserted successfully";
  } catch (e) {
    throw new AppError(e, 409);
  }
};

exports.delistProduct = async (id, listing) => {
  try {
    const result = await db.query(
      `UPDATE Product
      SET 
        Available = ?
      WHERE 
        productID = ?`,
      [listing || 1, id]
    );
    return "Product listing updated successfully";
  } catch (e) {
    throw new AppError(e, 409);
  }
};

exports.editProduct = async (id, productData) => {
  const updateQuery = query_gen(productData);

  try {
    const result = await db.query(
      `UPDATE Product
      SET 
        NameTH = ?,
        NameEN = ?,
        Thumbnail = ?,
        DesTH = ?,
        DesEN = ?,
        Brand = ?,
        IsColor = ?,
        source = ?
      WHERE 
        productID = ?`,
      [
        productData.NameTH || null,
        productData.NameEN || null,
        productData.Thumbnail || null,
        productData.DesTH || null,
        productData.DesEN || null,
        productData.Brand || null,
        productData.IsColor || 0,
        productData.source || null,
        id,
      ]
    );
    return "Product data updated successfully";
  } catch (e) {
    throw new AppError(e, 409);
  }
};

exports.editSize = async (id, sizeData) => {
  const checkIfRowExists = async (key, id) => {
    const result = await db.query(
      `
    SELECT *
    FROM Size
    WHERE ProductID = ? AND SizeID = ?`,
      [id, key]
    );
    return result;
  };

  const updateRow = async (id, key, sizeData) => {
    result = await db.query(
      `UPDATE Size
      SET 
        Des = ?,
        Packing = ?,
        Price = ?
      WHERE 
        ProductID = ? AND SizeID = ?`,
      [
        sizeData.Des || null,
        sizeData.Packing || null,
        sizeData.Price || null,
        id,
        key,
      ]
    );
    return result.row;
  };

  const insertRow = async (id, key, sizeData) => {
    const result = await db.query(
      `
      INSERT INTO Size 
        (ProductID, SizeID, Des, Packing, Price)
      VALUES 
        (?, ?, ?, ?, ?)`,
      [
        id,
        key,
        sizeData.Des || null,
        sizeData.Packing || null,
        sizeData.Price || null,
      ]
    );
  };

  try {
    for (const key in sizeData) {
      const rowExists = await checkIfRowExists(key, id);

      if (rowExists.length !== 0) {
        updateRow(id, key, sizeData[key]);
      } else {
        insertRow(id, key, sizeData[key]);
      }
    }
    return "Product's size data updated successfully";
  } catch (e) {
    throw new AppError(e, 409);
  }
};

exports.queryProduct = async (q, p) => {
  const offset = helper.getOffset(p, config.listPerPage);

  const product = await db.query(
    `SELECT *
    FROM 
      Product
    WHERE 
      Available="1" AND (NameTH LIKE ? OR NameEN LIKE ? OR ProductID LIKE ?)
    LIMIT 
      ?, ?;`,
    [`%${q}%`, `%${q}%`, `%${q}%`, `${offset}`, `${config.listPerPage}`]
  );

  return {
    product,
  };
};

exports.search = async (q) => {
  const queryStrings = q.split(" "); // Array of query strings
  const conditions = [];
  const param = [];

  queryStrings.forEach((queryString) => {
    conditions.push(
      `(
        p.NameTH LIKE ? 
        OR p.NameEN LIKE ? 
        OR p.ProductID LIKE ? 
        OR s.Des LIKE ?)`
    );
    param.push(
      `%${queryString}%`,
      `%${queryString}%`,
      `%${queryString}%`,
      `%${queryString}%`
    );
  });

  const product = await db.query(
    `
    SELECT p.*, (SELECT MIN(s.Price) FROM Size s WHERE s.ProductID = p.ProductID) AS MinPrice
    FROM Product p
    JOIN Size s ON p.ProductID = s.ProductID
    WHERE ${conditions.join(" AND ")}
    `,
    // [`%${q}%`, `%${q}%`, `%${q}%`, `${offset}`, `${config.listPerPage}`]
    param
  );

  return {
    product,
  };
};

exports.getOptions = async (id) => {
  const options = await db.query(
    `
    SELECT 
      DISTINCT b.NameTH, b.NameEN, b.BrandID 
    FROM 
      Product p 
    JOIN 
      Brand b ON p.Brand = b.BrandID 
    WHERE 
      p.SubCategory = ?;`,
    // [`%${q}%`, `%${q}%`, `%${q}%`, `${offset}`, `${config.listPerPage}`]
    [id]
  );

  return {
    options,
  };
}