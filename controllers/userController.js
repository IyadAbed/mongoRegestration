const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user = require("../models/user");


function generateToken({ firstName, lastName, email }) {
  const user = { firstName, lastName, email };
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  return token;
}

const addUser = async (req, res) => {
  try {
    const { fName, lName, password, email, user_type } = req.body;
    const token = generateToken({
      firstName: fName,
      lastName: lName,
      email: email,
    });
    const newAccount = new user({
      firstName: fName,
      lastName: lName,
      email: email,
      password: password,
      user_type: user_type,
      user_token: token,
    });

    const users = await user.findOne({ email: email });
    if (users) {
      return res.json({ error: "email has already exist" });
    }

    const newUser = await newAccount.save();
    res.json({ message: "Success adding new user" });
  } catch (error) {
    console.error("error adding new user", error);
  }
};

const allUsers = (req, res) => {
  // select * from user = find()
  user
    .find()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userInfo = await user.findOne({ email: email });
    if (!userInfo) {
      return res.json({ error: "email not found" });
    }

    const checkPass = await bcrypt.compare(password, userInfo.password);
    if (!checkPass) {
      return res.json({ error: "Invallid password" });
    }
    res.json(userInfo.user_token);
  } catch (error) {
    console.error("failed in login", error);
  }
};

module.exports = {
  allUsers,
  addUser,
  login,
};
