const errorHandler = (err, req, res, next) => {
  console.error(err);

  let statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  if (err.name === "CastError" || err.name === "ValidationError") {
    statusCode = 400;
  } else if (err.code === 11000) {
    statusCode = 409;
  }

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    stack:
      process.env.NODE_ENV === "development"
        ? err.stack
        : undefined,
  });
};

export default errorHandler;