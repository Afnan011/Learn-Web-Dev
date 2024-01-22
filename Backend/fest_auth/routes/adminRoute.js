const express = require("express");
const router = express.Router();
const {adminRoute, 
    getAllTeams, 
    getCodingMems, 
    getWebDesigningMems,
    getItManagerMems,
    getDesigningMems,
    getDumbCharadesMems,
    getPhotographyMems,
    getProductLaunchMems,
    getQuizMems,
    getDebateMems,
    getDanceMems,
    getGamingMems,
    getTreasureMems
} = require('../controller/adminController')


router.get('/', adminRoute);


router.get('/get-ids', getAllTeams);

router.get('/get-coding-mems', getCodingMems)

router.get('/get-web-mems', getWebDesigningMems)

router.get('/get-itmanger-mems', getItManagerMems)

router.get('/get-designing-mems', getDesigningMems)

router.get('/get-dumbcharades-mems', getDumbCharadesMems)

router.get('/get-photography-mems', getPhotographyMems)

router.get('/get-productlaunch-mems', getProductLaunchMems)

router.get('/get-quiz-mems', getQuizMems)

router.get('/get-debate-mems', getDebateMems)

router.get('/get-dance-mems', getDanceMems)

router.get('/get-gaming-mems', getGamingMems)

router.get('/get-treasure-mems', getTreasureMems)

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