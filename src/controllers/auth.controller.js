const {loginuser, registerUser} = require('../services/auth.service');
exports.registerUser = async (req, res) => {
  try {
    const {username, email, password} = req.body;
    const token = await registerUser({username, email, password});
    res.status(201).json({token});
  } catch (error) {
    res.status(400).json({error: error.message});
  }
}
exports.loginUser = async (req, res) => {
  try {
    const {email, password} = req.body;
    const token = await loginuser({email, password});
    res.status(200).json({token});
  } catch (error) {
    res.status(400).json({error: error.message});
  }
}
