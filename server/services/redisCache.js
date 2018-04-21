const mongoose = require("mongoose");
const winston = require("winston");
const redis = require("redis");
const util = require("util");
const redisUri = require("../../config/keys").redisUri;

const client = redis.createClient(redisUri);

// Making the redis client get function support promises
client.get = util.promisify(client.get);

const exec = mongoose.Query.prototype.exec;

// Custom file logger for easy debugging
const fileLogger = new winston.Logger({
  transports: [new winston.transports.File({ filename: "utility.log" })]
});

mongoose.Query.prototype.cache = function() {
  this.useCache = true;
  return this;
};

mongoose.Query.prototype.exec = async function() {
  if (!this.useCache) {
    return exec.apply(this, arguments);
  }
  console.log(this.mongooseOptions());
  // fileLogger.log("info", JSON.stringify(util.inspect(this)));

  // Using object assign so as not to mutate any sensitive data before it's passed back to mongoose
  // This key is what redis will use to record the "uniqueness" of this function
  const key = JSON.stringify(
    Object.assign({}, this.getQuery(), {
      collection: this.mongooseCollection.name,
      options: this.mongooseOptions()
    })
  );

  console.log(`Looking for a unique key of ${key}`);

  const cacheValue = await client.get(key);

  if (!cacheValue) {
    // Not cached, return the result after caching it
    const result = await exec.apply(this, arguments);
    client.set(key, JSON.stringify(result), "EX", 3600);
    return result;
  } else {
    // if already cached, get the redis value
    return JSON.parse(cacheValue);
  }
};
