const User = require("../model/user");
const Team = require('../model/team')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
  registerValidation,
  loginValidation,
} = require("../middleware/validation");

const signUpUser = async (req, res) => {
  //validate user {name, email, password}
  const { error } = registerValidation(req.body);

  if (error) {
    return res.status(400).json({ error: "user validation failed" });
  }

  //check user exists
  const emailExist = await User.findOne({ email: req.body.email });

  if (emailExist) {
    return res.status(400).json({ error: "User already exist" });
  }

  //encrypt password
  const password = await bcrypt.hash(req.body.password, 10);

  //create user object and save in the db
  const userObject = new User({
    name: req.body.name,
    email: req.body.email,
    password,
  });

  const newTeam = new Team(
    {
      collegeName: userObject.name,
      email: userObject.email,
      isUG: userObject.isUG
    }
  );

  // const festOb = Fest

  try {
    const savedUser = await userObject.save();
    if(savedTeam.isUG){

    }
    const savedTeam = await newTeam.save();
  22  res.json({ error: null, data: savedUser._id, collegeName: savedTeam.collegeName});
  } catch (err) {
    res.status(400).json({ error });
  }
};

const loginUser = async (req, res) => {
  //validate user {email, password}
  const { error } = loginValidation(req.body);

  if (error) {
    return res.status(400).json({ error: "user validation failed" });
  }

  //check user exists
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(400).json({ error: "user does not exist" });
  }

  //check the password for correctness
  const validPassword = await bcrypt.compare(req.body.password, user.password);

  //if password does not match throw an error
  if (!validPassword) {
    return res.status(400).json({ error: "wrong password" });
  }

  //create auth token with username and ID
  const token = jwt.sign(
    {
      name: user.name,
      id: user._id,
    },
    //token secret
    process.env.TOKEN_SECRET,

    //expiration time
    { expiresIn: process.env.TOKEN_EXPIRES_IN }
  );

  res.header("auth-token", token).json({
    error: null,
    data: { token },
  });
};

module.exports = { signUpUser, loginUser };
