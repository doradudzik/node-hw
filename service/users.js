const User = require("./schemas/user");

const createUser = async (body) => {
  try {
    return User.create(body);
  } catch (err) {
    console.log(err.message);
  }
};

const getUser = async (email) => {
  try {
    return User.findOne(email);
  } catch (err) {
    console.log(err.message);
  }
};
const updateUser = async (query, body) => {
  try {
    return User.findOneAndUpdate(query, body, { new: true });
  } catch (err) {
    console.log(err.message);
  }
};
module.exports = {
  createUser,
  getUser,
  updateUser,
};
