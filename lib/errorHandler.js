function errorHandler(err, req, res, next) {
  console.log('error is', err);
  if(err.name === 'ValidationError') {
    const response = {};

    for(const key in err.errors) {
      const errorObj = err.errors[key];
      console.log('Found an error', key, errorObj.message);
      response[key] = errorObj.message;
    }

    return res.status(422).json({ errors: response, message: 'Unprocessable entity' });
  }

  res.status(500).json({ message: 'Oops! A server error has occurred. Please try again later' });
}

module.exports = errorHandler;
