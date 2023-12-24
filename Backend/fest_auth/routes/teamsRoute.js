const express = require("express");
const router = express.Router();
const {getTeams, getTeamById, updateTeamById, clearEvents} = require("../controller/teamController");

router.get('/', getTeams);

router.get("/:teamId", getTeamById);

router.put('/:teamId', updateTeamById);

router.put('/event/:teamId', clearEvents);


module.exports = router;