const config = {
  db: {
    /* don't expose password or any sensitive info, done only for demo */
    host: "127.0.0.1",
    user: "root",
    password: "0891122331",
    database: "hjk_database",
    port: "3306",
    // socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock",
  },
  listPerPage: 10,
};

module.exports = config;
