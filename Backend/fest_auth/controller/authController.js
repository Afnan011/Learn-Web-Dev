const User = require("../model/user");
const Team = require("../model/team");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendConfirmationEmail } = require("../email/registationConfirmation");

const {
  registerValidation,
  loginValidation,
} = require("../middleware/validation");
const { getTeamById } = require("./teamController");

const signUpUser = async (req, res) => {
  //validate user {name, email, password}
  const { error } = registerValidation(req.body);

  if (error) {
    return res.status(400).json({ error: "user validation failed" });
  }

  //check user exists
  const emailExist = await User.findOne({ email: req.body.email });

  // if (emailExist) {
  //   return res.status(400).json({ error: "User already exist" });
  // }

  //encrypt password
  const password = await bcrypt.hash(req.body.password, 10);

  //create user object and save in the db
  const userObject = new User({
    name: req.body.name,
    email: req.body.email,
    isUG: req.body.isUG,
    password,
  });

  const newTeam = new Team({
    teamName: "not defined",
    collegeName: userObject.name,
    email: userObject.email,
    isUG: userObject.isUG,
  });

  try {
    const savedUser = await userObject.save();
    if (savedUser.isUG) {
      const UGTeam = await newTeam.save();
      console.log(UGTeam);
    } else {
      const PGTeam = await newTeam.save();
      console.log(PGTeam);
    }

    sendConfirmationEmail(newTeam.email, newTeam.collegeName);

    res.json({ error: null, data: savedUser._id, isUG: savedUser.isUG });
  } catch (err) {
    res.status(400).json({ err });
    console.log("something went wrong");
    console.log(err);
  }

  


};

const getTeamId = async (email) => {
  try {
    const team = await Team.findOne({ email: email });
    return team._id;
  } catch (err) {
    console.log("ERROR: " + err);
    return res.status(500).json({ message: err.message });
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

  //get the teamID of the user
  const teamId = await getTeamId(req.body.email);

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
    teamId: teamId,
  });
};

module.exports = { signUpUser, loginUser };
