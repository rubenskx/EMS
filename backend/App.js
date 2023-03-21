const express = require("express");
const app = express();
const path = require("path");
const mysql = require("mysql");
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/excel", async(req,res) => {
        const data = req.body;
    try {
          console.log(data);
          res.status(201).json({ message: "Event saved.", event: data });
        } catch (error) {
          res.status(404).json({ message: error });
        }
})

app.listen(7000, () => {
  console.log("LISTENING ON PORT 7000!");
});