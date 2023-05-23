const db = require("./db");
const helper = require("../helper");
const config = require("../config");

exports.getMultiple = async (subCategory, page = 1) =>  {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * 
    FROM Product 
    WHERE SubCategory = ${subCategory}
    LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

exports.getProduct = async (productId) => {
  const product = await db.query(
    `SELECT * 
    FROM Product 
    WHERE ProductID = ${productId}`
  );

  const size = await db.query(
    `SELECT * 
    FROM Size 
    WHERE ProductID = ${productId}`
  );

  return {
    product,
    size,
  };
}

exports.getAllCategory = async () => {
  const rows = await db.query(
    `SELECT *
    FROM Category`
  );
  return {
    rows,
  }
}

exports.getAllBrands = async () => {
  const rows = await db.query(
    `SELECT *
    FROM Brand`
  );
  return {
    rows,
  }
}

exports.getBrandItem = async (brandId) => {
  const rows = await db.query(
    `SELECT *
    FROM Product
    WHERE Brand = ${brandId}`
  );
  return {
    rows,
  }
}

exports.getAllSubCategory = async (param) => {
  const rows = await db.query(
    `SELECT *
    FROM SubCategory WHERE CategoryID = ${param}`
  );
  return {
    rows,
  }
}

exports.create = async (programmingLanguage) => {
  const result = await db.query(
    `INSERT INTO programming_languages 
    (name, released_year, githut_rank, pypl_rank, tiobe_rank) 
    VALUES 
    ("${programmingLanguage.name}", ${programmingLanguage.released_year}, ${programmingLanguage.githut_rank}, ${programmingLanguage.pypl_rank}, ${programmingLanguage.tiobe_rank})`
  );

  let message = "Error in creating programming language";

  if (result.affectedRows) {
    message = "Programming language created successfully";
  }

  return { message };
}

exports.update = async (id, programmingLanguage) => {
  const result = await db.query(
    `UPDATE programming_languages 
    SET name="${programmingLanguage.name}", released_year=${programmingLanguage.released_year}, githut_rank=${programmingLanguage.githut_rank}, 
    pypl_rank=${programmingLanguage.pypl_rank}, tiobe_rank=${programmingLanguage.tiobe_rank} 
    WHERE id=${id}`
  );

  let message = "Error in updating programming language";

  if (result.affectedRows) {
    message = "Programming language updated successfully";
  }

  return { message };
}

exports.remove = async (id) => {
  const result = await db.query(
    `DELETE FROM programming_languages WHERE id=${id}`
  );

  let message = "Error in deleting programming language";

  if (result.affectedRows) {
    message = "Programming language deleted successfully";
  }

  return { message };
}

// module.exports = {
//   getMultiple,
//   getAllCategory,
//   getAllSubCategory,
//   getOneProduct,
//   create,
//   update,
//   remove,
// };
