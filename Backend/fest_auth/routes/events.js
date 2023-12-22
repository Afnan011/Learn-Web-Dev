const express = require("express");
const router = express.Router();
const {ugTeamModel} = require('../model/fest')

router.get('/', async(req, res) => {
    // const events = await ITFestSchema.eventSchema.find();
    console.log('')

    res.send();
});


router.get("/:teamId", async (req, res) => {
    const team = await ITFestSchema.Team.findById(req.params.teamId);
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }
    res.send("succes");
});


module.exports = router;