const crypto = require("crypto");

var ImageKit = require("imagekit");
var fs = require('fs');

const Team = require("../model/team");

const getTeams = async (req, res) => {
  try {
    const teams = await Team.find();
    res.status(200).json(teams);
  } catch (err) {
    console.log("ERROR: " + err);
    res.status(500).json({ message: err.message });
  }
};

const getTeamById = async (req, res) => {
  try {
    const teamId = req.params.teamId;
    const team = await Team.findById(teamId);
    if (!team) {
      res
        .status(404)
        .json({ message: `cannot find Team with the ID ${teamId}` });
    }
    res.json(team);
  } catch (err) {
    console.log("ERROR: " + err);
    res.status(500).json({ message: err.message });
  }
};

const updateTeamById = async (req, res) => {
  try {
    const teamId = req.params.teamId;
    const team = await Team.findByIdAndUpdate(teamId, req.body);
    if (!team) {
      return res.status(404).json({ message: `cannot find Team with the ID ${teamId}` });
    }

    const updatedTeam = await Team.findById(teamId);
    res.json(updatedTeam);
  } catch (err) {
    console.log("ERROR: " + err);
    res.status(500).json({ message: err.message });
  }
};

const clearEvents = async (req, res) => {
  try {
    const teamId = req.params.teamId;
    const team = await Team.findById(teamId);
    if (!team) {
      return res
        .status(404)
        .json({ message: `cannot find Team with the ID ${teamId}` });
    }

    await Team.findByIdAndUpdate(teamId, { $unset: { events: 1 } });
    res.json({ message: "Events field deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

const verifyUpload = async (req, res) => {
  const privateKey = process.env.IMAGE_SERVER_TOKEN;

  const imagekit = new ImageKit({
      publicKey : 'public_KYo+rOuJkO2Bf74Wbbr5RrBz8lE=',
      privateKey : privateKey,
      urlEndpoint : "https://ik.imagekit.io/afnan011/"
  });
  
  const authParams = imagekit.getAuthenticationParameters();
  console.log(authParams);

  try {
    const teamId = req.params.teamId;
    const team = await Team.findById(teamId);
    if (!team) {
      res
        .status(404)
        .json({ message: `cannot find Team with the ID ${teamId}` });
    }
    
    res.json(authParams);
  } catch (err) {
    console.log("ERROR: " + err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getTeams,
  getTeamById,
  updateTeamById,
  clearEvents,
  verifyUpload,
};
