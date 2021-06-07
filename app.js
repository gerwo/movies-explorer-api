const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');

const { PORT, BASE_URL } = require('./config.js');
const routes = require('./routes/index.js');

const limiter = require('./middlewares/limiter.js');
const handleErrors = require('./middlewares/handleErrors.js');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

app.set('trust proxy', 1);

mongoose.connect(BASE_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(requestLogger);
app.use(limiter);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

app.use(routes);

app.use(errorLogger);
app.use(errors());

app.use(handleErrors);

app.listen(PORT);
