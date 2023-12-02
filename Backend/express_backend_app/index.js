const express = require("express");
const mongoose = require('mongoose')

const app = express();

const port = 3000;
const url = `mongodb+srv://afnan011:Afnan%40123@cluster0.7jypref.mongodb.net/?retryWrites=true&w=majority`;

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
  console.log(`Example app listening on port ${port}`);
});


