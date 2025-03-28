const express = require("express");
const mongoose = require('mongoose')

const app = express();

const port = 3000;
const url = MongoDBURL;

app.use(express.json())

app.get('/', (req, res) => {
  res.send("HELLO")
})


const userRouter = require("./routes/userRoute");
app.use("/user", userRouter);


mongoose.connect(url)


const con = mongoose.connection;
con.on('open', () => {
  console.log("Connected");
})


app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});


