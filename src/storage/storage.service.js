const ShareDB = require("sharedb");
const mongoose = require("mongoose");
const {
  MONGODB_URI,
  MONGODB_OPTION,
  MONGODB_DBNAME,
} = require("../utils/config");

mongoose.connect(MONGODB_URI + "/" + MONGODB_DBNAME, MONGODB_OPTION);
mongoose.Promise = global.Promise;

const db = require("sharedb-mongo")("mongodb://localhost:27017/nomore");
const backend = new ShareDB({ db });

module.exports = {
  User: require("../auth/auth.model"),
  Doc: require("../doc/doc.model"),
  backend,
};
