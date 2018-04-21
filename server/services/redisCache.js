const mongoose = require("mongoose");
const winston = require("winston");
const redis = require("redis");
const util = require("util");
const redisUri = require("../../config/keys").redisUri;

const client = redis.createClient(redisUri);
console.log(`Connecting to redis on ${redisUri}`);

// Making the redis client get function support promises
client.get = util.promisify(client.get);
client.del = util.promisify(client.del);

const exec = mongoose.Query.prototype.exec;

/**
 * Calling cache with a key option will use that key to store in the redis db
 * @param options
 * @returns {mongoose.Query}
 */
mongoose.Query.prototype.cache = function(options = {}) {
  this.useCache = true;
  this.redisKey = JSON.stringify(options.key || "");

  return this;
};

mongoose.Query.prototype.exec = async function() {
  if (!this.useCache) {
    return exec.apply(this, arguments);
  }

  let key;
  // If key is set manually, use that for storing
  if (this.redisKey){
    key = this.redisKey;
  } else {
    // Using object assign so as not to mutate any sensitive data before it's passed back to mongoose
    // This key is what redis will use to record the "uniqueness" of this function
    key = JSON.stringify(
      Object.assign({}, this.getQuery(), {
        collection: this.mongooseCollection.name,
        options: this.mongooseOptions()
      })
    );
  }

  winston.log("info", `Processing a cache-able request with a key ${key}`);

  const cacheValue = await client.get(key);

  if (!cacheValue) {
    // Not cached, return the result after caching it
    const result = await exec.apply(this, arguments);
    client.set(key, JSON.stringify(result), "EX", 15);
    winston.log("info", "No value was cached, is cached now");
    return result;
  } else {
    // if already cached, get the redis value
    winston.log("info", "Cached value was found, here's first 100 chars: ");
    winston.log("info", cacheValue.substr(0, 100));
    return JSON.parse(cacheValue);
  }
};

module.exports = {
  async clearProductCache(){
    await client.del("popular_products");
    await client.del("all_products");
  },
  async clearCategoryCache(){
    await client.del("categories");
  }
};