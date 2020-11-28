module.exports.config = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    ssl:
      process.env.IS_DB_SSL === 'true'
        ? {
          rejectUnauthorized: false,
        }
        : false,
    query_timeout: 30000,
  };
  