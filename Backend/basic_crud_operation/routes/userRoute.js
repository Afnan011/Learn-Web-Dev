const express = require("express");
const router = express.Router();
const {getUser, getUserById, postUser, putUser, deleteUser} = require("../controller/userController");

// THE SAME CODE CAN BE WRITTEN USING...
/*
    const  = require("../controller/userController").getUserById;
    const  = require("../controller/userController").postUser;
    const  = require("../controller/userController").putUser;
    const deleteUser = require("../controller/userController").deleteUser;
*/

//get User
router.get("/", getUser);

//get User By ID
router.get("/:id", getUserById);

//Post User
router.post("/", postUser);

//Update Single User
router.put("/:id", putUser);

//Delete User
router.delete("/:id", deleteUser);





module.exports = router;
