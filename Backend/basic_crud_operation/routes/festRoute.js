const express = require("express");
const router = express.Router();
const ITFest = require('../model/fest')

router.get('/', async(req, res) => {
    try {
        const Team = await ITFest.find();
        res.json(Team);
      } catch (err) {
        console.log("ERROR: " + err);
        res.status(500).json({ message: err.message });
      }
})


router.post('/', async (req, res) => {
    try {
      // Assuming you receive the data in the request body
      const newData = req.body;
  
      // Create an instance of the model
      const itFestInstance = new ITFestModel(newData);
  
      // Save the instance to the database
      await itFestInstance.save();
  
      res.status(200).json({ message: 'Data added successfully!' });
    } catch (error) {
      console.error('Error adding data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });



module.exports = router;