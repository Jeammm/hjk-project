const db = require("./db");
const config = require("../config");
const bcrypt = require("bcryptjs");

exports.create = async (newUser) => {
  const result = await db.query(
    `INSERT INTO Users 
    (username, password) 
    VALUES 
    ("${newUser.username}", "${newUser.password}")`
  );

  if (result.affectedRows) {
    const userId = await db.query(
      `SELECT UserID
      FROM USER
      WHERE username = "${newUser.username}"`
    )
    return userId[0].userID;
  }

  throw new Error("Couldn't create new user");
};

exports.getUserCredential = async (username) => {
  const result = await db.query(
    `SELECT *
    FROM Users
    WHERE username = "${username}"`
  );

  return result[0];
};

exports.getUserById = async (userId) => {
  const result = await db.query(
    `SELECT *
    FROM Users
    WHERE UserID = "${userId}"`
  );

  return result[0];
};

exports.correctPassword = async (candidatePassword, userPassword) => {
  return bcrypt.compare(candidatePassword, userPassword);
};
