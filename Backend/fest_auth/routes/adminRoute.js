const express = require("express");
const router = express.Router();
const {adminRoute, getAllTeams} = require('../controller/adminController')


router.get('/', adminRoute);


router.get('/get-ids', getAllTeams);

// router.get()


module.exports = router;