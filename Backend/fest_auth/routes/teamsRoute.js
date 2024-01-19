const express = require("express");
const path = require("path");
const router = express.Router();
const {getTeams, getTeamById, updateTeamById, clearEvents, verifyUpload} = require("../controller/teamController");

router.get('/', getTeams);

router.get('/download-schedule', (req, res) => {
    res.download(path.join(__dirname, '../views/schedule.pdf'))
});

router.get("/:teamId", getTeamById);

router.get('/:teamId/verify', verifyUpload);

router.put('/:teamId', updateTeamById);

router.put('/event/:teamId', clearEvents);



module.exports = router;