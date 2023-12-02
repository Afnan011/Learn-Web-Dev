const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/", async(req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.send("afnan it's an ERROR: " + err);
  }
});

router.get("/:id", async(req, res) => {
  try {
    const user = await User.findById(req.params.id)
    res.json(user);
  } catch (err) {
    res.send("USER NOT FOUND");
  }
});


router.post("/", async(req, res) => {
  const user = new User({
    name: req.body.name,
    rollNo: req.body.rollNo,
    whichClass: req.body.whichClass,
  });

  try {
    const user1 = await user.save();
    res.json(user1);
  } catch (err) {
    res.send("afnan it's an ERROR: " + err);
  }
});

router.patch("/:id", async(req, res) => {
    try {
        const user = await User.findById(req.params.id)
        user.whichClass = req.body.whichClass
        const user1 = await user.save()
        res.json(user1)
    } catch (err) {
        console.log("ERROR");
    } 
})


router.delete('/:id', async(req, res) => {
  try{
    const user = await User.findById(req.params.id).deleteOne()
    if(user.deletedCount != 0) 
      res.send("User deleted")
    else
      res.send("No user found")

  }catch(err){
    console.log("ERROR: " + err);
  }
})

router.put('/:id', async(req, res) => {
  try{
    const user = await User.findByIdAndUpdate(req.params.id, {
      whichClass: req.body.whichClass
      
    })

    const user1 = await user.save()



  }catch(err){
    console.log("ERROR: " + err)
  }
})


router.get("/new", (req, res) => {
  res.send("Add new User");
});

module.exports = router
