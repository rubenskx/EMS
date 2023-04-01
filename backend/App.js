const express = require("express");
const app = express();
const path = require("path");
const mysql = require("mysql");
const cors = require("cors");
const mysql = require("mysql");
const flash = require("connect-flash");
const nodemailer = require('nodemailer');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
   const employees = [
     {
       id: 1,
       name: "Ruben Sinu",
       department: "Tech",
       mobile_no: "+91 891287893",
       salary: 5000,
       increment: 5400,
     },
     {
       id: 2,
       name: "Abhay Unni",
       department: "Tech",
       mobile_no: "+91 891287893",
       salary: 5000,
       increment: 5000,
     },
     {
       id: 3,
       name: "Vishnu V Nair",
       department: "Tech",
       mobile_no: "+91 891287893",
       salary: 5000,
       increment: 6000,
     },
   ];

app.post("/excel", async (req, res) => {
  const data = req.body;
  try {
    console.log(data);
    res.status(201).json({ message: "Event saved.", event: data });
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

app.post("/search-form", async (req, res) => {
  try {
    const data = req.body;
    res.status(200).json({ message: "Success", employees });
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

app.get("/notifications", async(req,res) => {
    let array = [];
    array.push(employees);
    res.status(200).json({ message: "Success", array});
})

app.get("/increment", async(req,res) => {
  
  res.status(200).json({ message: "Success", employees});
})

app.post("/inform", async (req, res) => {
  const data = req.body;
  console.log(data);
  res.status(200).json({ message: "Success"});
});

app.put("/notifications/:id", async(req,res) => {
  const { id } = req.params;
  console.log(id);
  res.status(200).json({ message: "Success"});
})

app.post("/upload", async (req, res) => {
  const data = req.body;
  console.log("Form Data",data);
  res.status(200).json({ message: "Success" });
}); 

app.post("/search", async(req,res)=>{

});

app.listen(7000, () => {
  console.log("LISTENING ON PORT 7000!");
});
