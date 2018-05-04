const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const { sequelize } = require('./models');
const config = require('./config/config');
const router = require('./router');

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static('../client/dist'));

app.use('/api', router);

sequelize.sync({ force: false })
  .then(() => {
    app.listen(config.port);
    console.log(`Server started on port ${config.port}`);
  });

module.exports = app;
