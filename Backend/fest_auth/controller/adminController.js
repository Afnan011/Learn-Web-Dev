const Team = require("../model/team");

const adminRoute = async (req, res) => {
  res.status(200).json({ message: "Admin Route" });
};

const getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find(
      {},
      {
        email: 0,
        events: 0,
        accommodation: 0,
        paymentStatus: 0,
        createdAt: 0,
        updatedAt: 0,
        __v: 0
      }
    );
    res.status(200).json(teams);
  } catch (err) {
    console.log("ERROR: " + err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = { adminRoute, getAllTeams };
