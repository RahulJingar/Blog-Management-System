const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 5000;
app.use(express.json());

const mongoURL = `mongodb://localhost:27017/rewathiProject`;
mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("mongoose is connected");
  })
  .catch((err) => {
    console.log(`error: ${err}`);
  });

app.listen(port, () => {
  console.log(`server is running on the ${port}`);
});
