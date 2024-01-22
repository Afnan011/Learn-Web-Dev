const express = require("express");
const router = express.Router();
const {adminRoute, getAllTeams, getCodingMems} = require('../controller/adminController')


router.get('/', adminRoute);


router.get('/get-ids', getAllTeams);

router.get('/get-coding-mems', getCodingMems)


module.exports = router;

