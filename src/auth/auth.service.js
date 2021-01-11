const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const storage = require("../storage/storage.service");
const { JWT_CONSTANT_SECRET } = require("../utils/config");
const User = storage.User;

module.exports = {
  login,
  getById,
  register,
};

async function login({ username, password }) {
  const user = await User.findOne({ username });
  if (user && bcrypt.compareSync(password, user.hash)) {
    const token = jwt.sign({ sub: user.id }, JWT_CONSTANT_SECRET, {
      expiresIn: "7d",
    });
    return {
      ...user.toJSON(),
      token,
    };
  }
}

async function getById(id) {
  return await User.findById(id);
}

async function register(userParam) {
  // validate
  if (await User.findOne({ username: userParam.username })) {
    throw 'Username "' + userParam.username + '" is already taken';
  }

  const user = new User(userParam);

  // hash password
  if (userParam.password) {
    user.hash = bcrypt.hashSync(userParam.password, 10);
  }

  // save user
  await user.save();
}
