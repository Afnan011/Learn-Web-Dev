const User = require("../model/user");

const getUser = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.log("ERROR: " + err);
    res.status(500).json({ message: err.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    console.log("ERROR: " + err);
    res.status(500).json({ message: err.message });
  }
};

const postUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    console.log("ERROR: " + err);
    res.status(500).json({ message: err.message });
  }
};

const putUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndUpdate(id, req.body);
    if (!user) {
      res.status(404).json({ message: `cannot find User with the ID ${id}` });
    }

    const updatedUser = await User.findById(id);
    res.json(updatedUser);
  } catch (err) {
    console.log("ERROR: " + err);
    res.status(500).json({ message: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      res.status(404).json({ message: `cannot find user with the ID ${id}` });
    }

    res.json(user);
  } catch (err) {
    console.log("ERROR: " + err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getUser,
  getUserById,
  postUser,
  putUser,
  deleteUser,
};
