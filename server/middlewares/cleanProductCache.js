const { clearCategoryCache, clearProductCache } = require("../services/redisCache");

module.exports = async (req, res, next) => {
  await next();

  await clearCategoryCache();
  await clearProductCache();
  console.log("Clearing product cache...");
};