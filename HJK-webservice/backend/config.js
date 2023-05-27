const config = {
  db: {
    /* don't expose password or any sensitive info, done only for demo */
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE,
    port: process.env.SQL_PORT,
    // socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock",
  },
  listPerPage: process.env.LIST_PER_PAGE,
};

module.exports = config;
