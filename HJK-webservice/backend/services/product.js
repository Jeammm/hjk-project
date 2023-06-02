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

  console.log(listing)

  try {
    const result = await db.query(
      `UPDATE Product
      SET 
        Available = ?
      WHERE 
        productID = ?`,
      [
        listing || 1,
        id,
      ]
    );
    return "Product listing updated successfully";
  } catch (e) {
    throw new AppError(e, 409);
  }
}

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
    const result = await db.query(`
    SELECT *
    FROM Size
    WHERE ProductID = "${id}" AND SizeID = "${key}"
    `);
    return result;
  };

  const updateRow = async (id, key, sizeData) => {
    const updateQuery = query_gen(sizeData);

    result = await db.query(
      `UPDATE Size
      SET ${updateQuery}
      WHERE ProductID="${id}" AND SizeID="${key}"`
    );
    return result.row;
  };

  const insertRow = async (id, key, sizeData) => {
    const result = await db.query(`
      INSERT INTO Size 
      (ProductID, SizeID, Des, Packing, Price)
      VALUES 
      ("${id}", ${key}, "${sizeData.Des}", "${sizeData.Packing}" ,"${sizeData.Price}")
      `);
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
    return "Product data updated successfully";
  } catch (e) {
    throw new AppError(e, 409);
  }
};

exports.queryProduct = async (q, p) => {
  const offset = helper.getOffset(p, config.listPerPage);
  const product = await db.query(
    `SELECT *
    FROM Product
    WHERE Available="1" AND (NameTH LIKE '%${q}%' OR NameEN LIKE '%${q}%' OR ProductID LIKE '%${q}%')
    LIMIT ${offset},${config.listPerPage};`
  );

  return {
    product,
  };
};
