const db = require("./db");

const config = require("../config");

const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

exports.getBannerSettings = async () => {
  const banners = await db.query(
    `SELECT * 
    FROM 
      Banner`
  );

  const settings = await db.query(
    `SELECT * 
    FROM 
      BannerSettings 
    JOIN
      Banner ON Banner.BannerID = BannerSettings.BannerID`,
  );

  return {
    banners,
    settings,
  };
};

// exports.addBanner = async () => {
//   try {
//     const result = await db.query(
//       `INSERT INTO Product 
//       (NameTH, NameEN, Thumbnail, DesTH, DesEN, Brand, IsColor, SubCategory, source)
//       VALUES 
//       (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//       [
//         productData.NameTH || null,
//         productData.NameEN || null,
//         productData.Thumbnail || null,
//         productData.DesTH || null,
//         productData.DesEN || null,
//         productData.Brand || null,
//         productData.IsColor || 0,
//         id,
//         productData.source || null,
//       ]
//     );

//     return "New product detail inserted successfully";
//   } catch (e) {
//     throw new AppError(e, 409);
//   }
// }