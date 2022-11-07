require("dotenv").config();
const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

mongoose.connect(DATABASE_URL, { useNewUrlParser: true });

const db = mongoose.connection;

db.on("error", (error) => {
  console.log(error);
});

db.once("open", () => {
  console.log("Connected to Database");
});

app.use(express.json());

const saveEatRouter = require("./routes/saveEat");
app.use("/saveEat", saveEatRouter);

app.listen(PORT, () => {
  console.log(`Server Started on Port:${PORT}`);
});
