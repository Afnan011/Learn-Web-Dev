const express = require("express");
const router = express.Router();
const {adminRoute, getAllTeams, getCodingMems, getWebDesigningMems} = require('../controller/adminController')


router.get('/', adminRoute);


router.get('/get-ids', getAllTeams);

router.get('/get-coding-mems', getCodingMems)

router.get('/get-web-mems', getWebDesigningMems)

router.get('/get-')

module.exports = router;


// coding: [seperate],
// web: [seperate],

// itManager: [pg],
// designing: [pg],

// dumbCharades: [ug],

// photography: [combined],
// productLaunch: [combined],
// quiz: [combined],
// debate: [combined],
// dance: [combined],
// gaming: [combined],
// treasure: [combined],