const experss = require('express');

const app = experss();
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

// 1) MIDDLEWARES==========================================


console.log(process.env.NODE_ENV);


if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(experss.json());
app.use(experss.static(`${__dirname}/public`));

app.use((req, res, next) => {
  
  console.log( 'Hello from the middleware🤘');
  
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 2) ROUTE HANDLERS=========================================

// 3) ROUTES=============================================

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// 4) START THE SERVER========================================

module.exports = app;
