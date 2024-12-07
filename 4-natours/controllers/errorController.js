const AppError = require('../utils/appError');

const handleCastErrorDB = err => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const sendErrorDev = (err, res, req) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  });
};

const sendErrorPro = (err, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
    // Programming or other unknow error: don't leak error details
  } else {
    // 1) Log the error
    console.error('ERROR ❤️‍🔥', err);
    //  2)Send genetic message
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong'
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if ((process.env.NODE_ENV = 'production')) {
    // let error = { ...err };
    let error = JSON.parse(JSON.stringify(err));
    if (error.name === 'CastError') error = handleCastErrorDB(error);
    sendErrorPro(error, res);
  }
};
