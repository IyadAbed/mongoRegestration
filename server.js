const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRouts = require("./routes/userRouter");
const port = process.env.PORT;
const dbUrl =
  "mongodb+srv://iyadraslan:1234@cluster0.4duce3z.mongodb.net/mongotest";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome");
});
app.use(userRouts);

module.exports = {
  server: app,
  start: () => {
    mongoose
      .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(()=> console.log('connected to mongoDB'))
      .then(() => {
        app.listen(port, () => {
          console.log(`server is running on port ${port}`);
        });
      });
  },
};
