function errorMessage(res, error, status) {
  console.error(error);
  res.status(status).json({
    message: `${error}`,
    ok: false
  });
}

module.exports = errorMessage