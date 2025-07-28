const User = require('../modals/user.modal');
const jwt = require('../utils/jwt');

exports.registerUser = async ({username, email, password}) => {
  const user = await User.create({username, email, password});
  const token = jwt.signToken({id: user._id}, '1d');
  return token;
};

exports.loginuser = async ({email, password}) => {
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new Error('User not found');
  };
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }
  const token = jwt.signToken({id: user._id}, '1d');
  return token;
};
