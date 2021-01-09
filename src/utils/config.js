const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017";
const MONGODB_DBNAME = process.env.MONGODB_DBNAME || "nomore";
const MONGODB_OPTION = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

const JWT_CONSTANT_SECRET =
  process.env.JWT_CONSTANT_SECRET ||
  "THIS IS USED TO SIGN AND VERIFY JWT TOKENS, REPLACE IT WITH YOUR OWN SECRET, IT CAN BE ANY STRING";
const URL_LEN = process.env.URL_LEN || 10;

module.exports = {
  MONGODB_URI,
  MONGODB_DBNAME,
  MONGODB_OPTION,
  JWT_CONSTANT_SECRET,
  URL_LEN,
};
