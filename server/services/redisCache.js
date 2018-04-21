const mongoose = require("mongoose");
const winston = require("winston");
const redis = require("redis");
const util = require("util");
const redisUri = require("../../config/keys").redisUri;

const client = redis.createClient(redisUri);

// Making the redis client get function support promises
client.get = util.promisify(client.get);

const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache = function(options = {}) {
  this.useCache = true;
  return this;
};

mongoose.Query.prototype.exec = async function() {
  if (!this.useCache) {
    return exec.apply(this, arguments);
  }
  winston.log(
    "info",
    `About to run a query which will be cached from ${
      this.mongooseCollection.name
    }`
  );

  // Using object assign so as not to mutate any sensitive data before it's passed back to mongoose
  // This key is what redis will use to record the "uniqueness" of this function
  const key = JSON.stringify(
    Object.assign({}, this.getQuery(), {
      collection: this.mongooseCollection.name
    })
  );

  const cacheValue = await client.get(key);

  // if already cached, get the redis value
  if (cacheValue) {
    const doc = JSON.parse(cacheValue);
    // Handle the case when cached value is actually an array
    return Array.isArray(doc)
      ? doc.map(d => new this.model(d))
      : new this.model(doc);
  }

  // Not cached, return the result after caching it
  const result = await exec.apply(this, arguments);
  client.set(key, JSON.stringify(result), "EX", 3600);
  return result;
};
