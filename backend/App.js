const express = require("express");
const app = express();
const path = require("path");
const mysql = require("mysql");
const cors = require("cors");
const cron = require("node-cron");
const { query } = require("express");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "ems",
  multipleStatements: "true", //this is required for querying multiple statements in mysql
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database: " + err.stack);
    return;
  }
  console.log("Connected to database");
});

function runQuery() {
  const date = new Date();
  const day = date.getDate();
  const todayDate = new Date().toISOString().slice(0, 10);
  const query = `SELECT * FROM employee_data WHERE wef BETWEEN DATE_SUB("${todayDate}", INTERVAL 30 DAY) AND "${todayDate}"`;
  console.log(query);
  if (day === 15 || day === 28) {
    connection.query(
      `INSERT INTO notifications (query,type) VALUES (${query}, "salary incrementation");`,
      (error, results, fields) => {
        if (error) {
          return;
        }
        console.log("Query executed successfully!");
      }
    );
  } else {
    console.log("Not the 15th or 28th day of the month.");
  }
}

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

cron.schedule("0 0 0 * * *", () => {
  console.log("Running task...");
  runQuery();
});

app.post("/excel", async (req, res) => {
  const data = req.body;
  console.log(data);
  var errorString = "";
  for (let i = 0; i < data.length; i++) {
    try {
      const [deptRes, currDesigRes, prevDesigRes, projRes] = await Promise.all([
        queryDatabase(
          `SELECT department_id FROM department where name="${data[i].department}"`
        ),
        queryDatabase(
          `SELECT designation_id FROM designation where designation_name="${data[i].current_designation}"`
        ),
        queryDatabase(
          `SELECT designation_id FROM designation where designation_name="${data[i].previous_designation}"`
        ),
        queryDatabase(
          `SELECT project_id from project where project_name="${data[i].project}"`
        ),
      ]);

      if (
        !(
          deptRes.length &&
          currDesigRes.length &&
          prevDesigRes.length &&
          projRes.length
        )
      ) {
        errorString += `${data[i].id},`;
      } else {
        const query = `INSERT INTO employee_data (id,name,mobile_no,gender,date_of_joining,qualification,previous_experience,year_of_course_completion,retired,current_salary,wef,deduction,remarks,head_engineer,director,email,department_id,project_id,current_designation_id ,previous_designation_id) VALUES ("${data[i].id}", "${data[i].name}","${data[i].mobile_no}", "${data[i].gender}", "${data[i].date_of_joining}","${data[i].qualification}","${data[i].previous_experience}",${data[i].year_of_course_completion},"${data[i].retired}",${data[i].current_salary},"${data[i].wef}",${data[i].deduction},"${data[i].remarks}","${data[i].head_engineer}","${data[i].director}","${data[i].email}",${deptRes[0].department_id},${projRes[0].project_id},${currDesigRes[0].designation_id}, ${prevDesigRes[0].designation_id}); INSERT INTO salary(salary,wef_date,status,employee_id) VALUES(${data[i].current_salary},"${data[i].wef}","current", "${data[i].id}");`;
        const result = await queryDatabase(query);
        console.log("Working!!");
      }
    } catch (error) {
      console.error("Error performing query: " + error.stack);
      errorString += `${data[i].id},`;
    }
  }

  if (errorString === "") {
    return res.status(201).json({ message: "Event saved.", event: "Success" });
  } else {
    return res.status(401).json({
      message: `There is some issue with the data provided. Please verify and try again.`,
    });
  }
});

function queryDatabase(query) {
  return new Promise((resolve, reject) => {
    connection.query(query, (error, result, fieldData) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

app.post("/search-form", async (req, res) => {
  let qtitle="";
  let qgender="";
  let qdate="";
  let qcurrentdesignation="";
  let qpreviousdesignation="";
  let qretired="";
  let qqualification="";
  let qdepartment="";
  let qdirector="";
  let qhead="";
  let qprojectname="";
  let qremarks="";
  let qwef_date="";
  let qsalary_greater="";
  let qsalary_lesser="";
  let qexperience="";

  rdata=req.body;
  console.log(rdata);

  if(rdata.title!=""){
    qtitle=` employee_data.name LIKE '%${rdata.title}%'`;
  }
  else{
    qtitle=" employee_data.name LIKE '%'";
  }
  if(rdata.data!=""){
    if(rdata.otd){
      qdate=` AND date_of_joining = '${rdata.date}'`;
    }
    else if(rdata.btd){
      qdate=` AND date_of_joining <= '${rdata.date}'`;
    }
    else{
      qdate=` AND date_of_joining >= '${rdata.date}'`;
    }
  }
  if(rdata.director!=""){
    qdirector=` AND director LIKE '%${rdata.director}%'`;
  }
  if(rdata.head!=""){
    qhead=` AND head_engineer LIKE '%${rdata.head}%'`;
  }
  if(rdata.qualification!=""){
    qqualification=` AND qualification LIKE '%${rdata.qualification}%'`;
  }
  if(rdata.remarks!=""){
    qremarks=` AND remarks LIKE '%${rdata.remarks}%'`;
  }
  if(rdata.wef_date!=""){
    qwef_date=` AND wef = '${rdata.wef_date}'`;
  }
  if(rdata.salary_greater!==""){
    qsalary_greater= ` AND current_salary >= ${rdata.salary_greater}`;
  }
  if(rdata.salary_less!==""){
    qsalary_lesser=` AND current_salary <= ${rdata.salary_lesser}`;
  }

  if(rdata.months){
    qexperience=` AND previous_experience LIKE '${rdata.months}%M%' OR previous_experience LIKE '${rdata.months}%m%'` ;
  }
  if(rdata.years){
    qexperience=` AND previous_experience LIKE '${rdata.years}%Y%' OR previous_experience LIKE '${rdata.years}%y%'`;
  }
  if(rdata.gender!="Choose..."){
    qgender=` AND gender LIKE '${rdata.gender}%'`;
  }
  if(rdata.department!="Choose..."){
    qdepartment=` AND employee_data.department_id=${rdata.department} AND employee_data.department_id=department.department_id`;
  }
  if(rdata.previous_designation!="Choose..."){
    qpreviousdesignation=` AND previous_designation_id=${rdata.previous_designation} AND employee_data.previous_designation_id=designation.designation_id`;
  }
  if(rdata.current_designation!="Choose..."){
    qcurrentdesignation=` AND current_designation_id=${rdata.current_designation} AND employee_data.current_designation_id=designation.designation_id`;
  }

  if(rdata.projectid!="Choose..."){
    qprojectname=` AND employee_data.project_id=${rdata.projectid} AND employee_data.project_id=project.project_id`;
  }
  let query=`SELECT * FROM employee_data,department,designation,project 
  WHERE ${qtitle} ${qgender} ${qdate} ${qcurrentdesignation} ${qpreviousdesignation} 
  ${qretired} ${qqualification} ${qdepartment} ${qdirector} ${qhead} ${qprojectname} ${qremarks} 
  ${qwef_date} ${qsalary_greater} ${qsalary_lesser} ${qexperience};`;
  data = await queryDatabase(query);

  try {
    res.status(200).json({ message: "Success", data });
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

app.get("/notifications", async (req, res) => {
  const notifications = await queryDatabase("SELECT * from notifications");
  let array = [];
  for (let notification of notifications){
      const resultData = await queryDatabase(notification.query);
      array.push({ data : resultData, title: `Found ${resultData.length} employees with salary incrementation.`})
  }
  res.status(200).json({ message: "Success", array });
});

app.get("/increment", async (req, res) => {
  res.status(200).json({ message: "Success", employees });
});

app.post("/inform", async (req, res) => {
  const data = req.body;
  console.log(data);
  res.status(200).json({ message: "Success" });
});

app.put("/notifications/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  res.status(200).json({ message: "Success" });
});

app.post("/upload", async (req, res) => {
  const data = req.body;
  console.log("Form Data", data);
  res.status(200).json({ message: "Success" });
}); 
app.listen(7000, () => {
  console.log("LISTENING ON PORT 7000!");
});
