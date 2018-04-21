module.exports = (err, req, res, next) => {
  switch (err.code) {
    case "LIMIT_FILE_SIZE":
      res.status(400).send({ message: "File too large" });
      break;
    case "LIMIT_UNEXPECTED_FILE":
      res.status(400).send({ message: "Too many files at once" });
      break;
    default:
      console.error("Caught error", err.code, err.stack);
      res.status(500).send({ message: "Server error" });
  }
};
