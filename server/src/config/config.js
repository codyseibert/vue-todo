const path = require('path');

module.exports = {
  port: process.env.PORT || 8081,
  db: {
    database: process.env.DB_NAME || 'vuetodo',
    user: process.env.DB_USER || 'vuetodo',
    password: process.env.DB_PASS || 'vuetodo',
    options: {
      dialect: process.env.DB_DIALECT || 'sqlite',
      host: process.env.DB_HOST || 'localhost',
      storage: path.resolve(__dirname, '../../vuetodo.sqlite'),
    },
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'secret',
  },
};
