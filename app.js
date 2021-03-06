const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors, celebrate, Joi } = require('celebrate');

const NotFoundError = require('./errors/not-found-err');
const { requestLogger, errorLogger } = require('./middlewares/logger');

require('dotenv').config();
console.log(process.env.NODE_ENV);
const { PORT = 3004 } = process.env; //PORT

const CORS_WHITELIST = [
  'http://localhost:3000',
  'https://localhost:3000',
  'https://www.localhost:3000',
  'http://www.localhost:3000',
  ];
  const app = express();
  app.use(helmet());
  const corsOption = {
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    preflightContinue: false,
    optionsSuccessStatus: 204,
    allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
    credentials: true,
    origin: [
      'http://localhost:3000',
      'https://localhost:3000',
      'https://www.localhost:3000',
      'http://www.localhost:3000',
      'http://wu-space.ru',
      'https://wu-space.ru',
      'https://www.wu-space.ru',
      'http://www.wu-space.ru',
      ],
  };
  app.use('*', cors(corsOption));
  app.use(cookieParser());
  // mongoose.connect('mongodb://localhost:27017/wu', {
  //   useUnifiedTopology: true,
  //   useNewUrlParser: true,
  // });
  
  app.use(express.json());
  app.use(requestLogger);
  // app.use(cors(corsOption));

  app.use('/api/yaclients', require('./routes/yaclients'));
 
  // eslint-disable-next-line no-unused-vars
  app.use((req, res) => {
    throw new NotFoundError('Запрашиваемый ресурс не найден');
  });
  app.use(errorLogger);
  app.use(errors());
  
  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    // если у ошибки нет статуса, выставляем 500
    const { statusCode = 500, message } = err;
  console.log(err)
    res
      .status(statusCode)
      .send({
        // проверяем статус и выставляем сообщение в зависимости от него
        message: statusCode === 500
          // ? 'На сервере произошла ошибка'
          ? message
          : message,
      });
  });
  
  app.listen(PORT, () => {
  
  });
  