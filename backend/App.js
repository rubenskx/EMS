const express = require("express");
const app = express();
const path = require("path");
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const cors = require("cors");
const cron = require("node-cron");
const { query } = require("express");
const nodemailer = require("nodemailer");

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

app.post("/login", async (req, res) => {
  const data = req.body;
  console.log(data);
  const query = `SELECT * FROM admin_details`;
  const result = await queryDatabase(query);
  if (data.username === result[0].username) {
    const match = bcrypt.compareSync(data.password, result[0].password);
    if (match) {
      return res.status(201).json({ message: "Success" });
    } else {
      return res.status(422).json({ message: "Wrong passsword!" });
    }
  } else {
    return res.status(422).json({ message: "Wrong password!" });
  }
});

async function runQuery() {
  try {
    const date = new Date();
    const day = date.getDate();
    const todayDate = new Date().toISOString().slice(0, 10);
    const wef = await queryDatabase(
      `SELECT * FROM employee_data WHERE wef BETWEEN "${todayDate}" AND DATE_ADD("${todayDate}", INTERVAL 30 DAY)`
    );
    const contract = await queryDatabase(
      `SELECT * FROM employee_data WHERE contract_renewal BETWEEN "${todayDate}" AND DATE_ADD("${todayDate}", INTERVAL 30 DAY)`
    );
    const probation = await queryDatabase(
      `SELECT * FROM employee_data WHERE probation_date BETWEEN "${todayDate}" AND DATE_ADD("${todayDate}", INTERVAL 30 DAY)`
    );
    console.log(wef, contract, probation);

    if (day === 15 || day === 28) {
      if (wef.length) {
        const response = await queryDatabase(
          `INSERT INTO notifications (query,type) VALUES (${query}, "salary incrementation");`
        );
      }
      if (probation.length) {
        const response = await queryDatabase(
          `INSERT INTO notifications (query,type) VALUES (${query}, "ending probation period");`
        );
      }
      if (contract.length) {
        const response = await queryDatabase(
          `INSERT INTO notifications (query,type) VALUES (${query}, "contract renewal");`
        );
      }
    } else {
      console.log("Not the 15th or 28th day of the month.");
    }
  } catch (err) {
    console.log(err);
  }
}

cron.schedule("0 0 0 * * *", () => {
  console.log("Running task...");
  runQuery();
});

app.post("/excel", async (req, res) => {
  const data = req.body;
  var errorString = "";
  for (let i = 0; i < data.length; i++) {
    try {
      const [deptRes, currDesigRes, prevDesigRes, projRes] = await Promise.all([
        queryDatabase(
          `SELECT department_id FROM department where name="${data[i].department}";`
        ),
        queryDatabase(
          `SELECT designation_id FROM designation where designation_name="${data[i].current_designation}";`
        ),
        queryDatabase(
          `SELECT designation_id FROM designation where designation_name="${data[i].previous_designation}";`
        ),
        queryDatabase(
          `SELECT project_id from project where project_name="${data[i].project}";`
        ),
      ]);
      console.log(deptRes, currDesigRes, prevDesigRes, projRes);
      console.log(
        `SELECT designation_id FROM designation where designation_name="${data[i].current_designation}"`,
        `SELECT project_id from project where project_name="${data[i].project}"`
      );

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
        const basic = Math.round(data[i].current_salary / 1.86);
        const query = `INSERT INTO employee_data (id,name,mobile_no,gender,date_of_joining,qualification,previous_experience,year_of_course_completion,retired,current_salary,wef,deduction,remarks,head_engineer,director,email,department_id,project_id,current_designation_id ,previous_designation_id,Basic_Salary) VALUES ("${data[i].id}", "${data[i].name}","${data[i].mobile_no}", "${data[i].gender}", "${data[i].date_of_joining}","${data[i].qualification}","${data[i].previous_experience}",${data[i].year_of_course_completion},"${data[i].retired}",${data[i].current_salary},"${data[i].wef}",${data[i].deduction},"${data[i].remarks}","${data[i].head_engineer}","${data[i].director}","${data[i].email}",${deptRes[0].department_id},${projRes[0].project_id},${currDesigRes[0].designation_id}, ${prevDesigRes[0].designation_id},${basic}); INSERT INTO salary(salary,wef_date,status,employee_id) VALUES(${data[i].current_salary},"${data[i].wef}","current", "${data[i].id}");`;
        console.log(query);
        const result = await queryDatabase(query);

        console.log("Working!!");
      }
    } catch (error) {
      console.error("Error performing query: " + error.stack);
      console.log(error.stack);
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
  let qtitle = "";
  let qgender = "";
  let qdate = "";
  let qcurrentdesignation = "";
  let qpreviousdesignation = "";
  let qretired = "";
  let qqualification = "";
  let qdepartment = "";
  let qdirector = "";
  let qhead = "";
  let qprojectname = "";
  let qremarks = "";
  let qwef_date = "";
  let qjoining_date_lesser = "";
  let qjoining_date_greater = "";
  let qcontract_renewal_lesser = "";
  let qcontract_renewal_greater = "";
  let qprobation_date_lesser = "";
  let qprobation_date_greater = "";
  let qsalary_greater = "";
  let qsalary_lesser = "";
  let qexperience = "";

  rdata = req.body;
  console.log(rdata);

  if(rdata.date_joining_greater!=""){
    qjoining_date_greater = `AND employee_data.date_of_joining >= '${rdata.date_joining_greater}'`
  }
  if (rdata.date_joining_lesser!="") {
    qjoining_date_lesser = `AND employee_data.date_of_joining <= '${rdata.date_joining_lesser}'`;
  }
  if (rdata.date_contract_greater!="") {
    qcontract_renewal_greater = `AND employee_data.contract_renewal >= '${rdata.date_contract_greater}'`;
  }
  if (rdata.date_contract_lesser != "") {
    qcontract_renewal_lesser = `AND employee_data.contract_renewal <= '${rdata.date_contract_lesser}'`;
  }
  
  if (rdata.date_probation_greater != "") {
    qprobation_date_greater = `AND employee_data.probation_date >= '${rdata.date_probation_greater}'`;
  }
  if (rdata.date_probation_lesser != "") {
    qprobation_date_lesser = `AND employee_data.probation_date <= '${rdata.date_probation_lesser}'`;
  }
  

  if (rdata.title != "") {
    qtitle = ` employee_data.name LIKE '%${rdata.title}%'`;
  } else {
    qtitle = " employee_data.name LIKE '%'";
  }
  
  if (rdata.director != "") {
    qdirector = ` AND director LIKE '%${rdata.director}%'`;
  }
  if (rdata.head != "") {
    qhead = ` AND head_engineer LIKE '%${rdata.head}%'`;
  }
  if (rdata.qualification != "") {
    qqualification = ` AND qualification LIKE '%${rdata.qualification}%'`;
  }
  if (rdata.remarks != "") {
    qremarks = ` AND remarks LIKE '%${rdata.remarks}%'`;
  }
  if (rdata.wef_date != "") {
    qwef_date = ` AND wef = '${rdata.wef_date}'`;
  }
  if (rdata.salary_greater !== "") {
    qsalary_greater = ` AND current_salary >= ${rdata.salary_greater}`;
  }
  if (rdata.salary_less !== "") {
    qsalary_lesser = ` AND current_salary <= ${rdata.salary_lesser}`;
  }

  if (rdata.months) {
    qexperience = ` AND previous_experience LIKE '${rdata.months}%M%' OR previous_experience LIKE '${rdata.months}%m%'`;
  }
  if (rdata.years) {
    qexperience = ` AND previous_experience LIKE '${rdata.years}%Y%' OR previous_experience LIKE '${rdata.years}%y%'`;
  }
  if (rdata.gender != "Choose...") {
    qgender = ` AND gender LIKE '${rdata.gender}%'`;
  }
  if (rdata.department != "Choose...") {
    qdepartment = ` AND employee_data.department_id=${rdata.department} AND employee_data.department_id=department.department_id`;
  }
  if (rdata.previous_designation != "Choose...") {
    qpreviousdesignation = ` AND previous_designation_id=${rdata.previous_designation} AND employee_data.previous_designation_id=t.designation_id`;
  }
  if (rdata.current_designation != "Choose...") {
    qcurrentdesignation = ` AND current_designation_id=${rdata.current_designation} AND employee_data.current_designation_id=s.designation_id`;
  }

  if (rdata.projectid != "Choose...") {
    qprojectname = ` AND employee_data.project_id=${rdata.projectid} AND employee_data.project_id=project.project_id`;
  }

  const fixedQuery = `AND t.designation_id=previous_designation_id AND s.designation_id=current_designation_id AND employee_data.department_id = department.department_id AND project.project_id = employee_data.project_id
     ;`;
  let query = `SELECT *, employee_data.name as emp_name,t.designation_name as previous_designation, s.designation_name as current_designation FROM employee_data,department,designation as t,designation as s, project 
  WHERE ${qtitle} ${qgender} ${qcurrentdesignation} ${qpreviousdesignation} 
  ${qretired} ${qqualification} ${qdepartment} ${qdirector} ${qhead} ${qprojectname} ${qremarks} 
  ${qwef_date} ${qsalary_greater} ${qsalary_lesser} ${qexperience} ${fixedQuery}`;
  console.log(query);
  data = await queryDatabase(query);

  try {
    console.log("return size", data.length);
    res.status(200).json({ message: "Success", data });
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

app.get("/home", async (req, res) => {
  console.log("home");
  const [totalEmployees, HRAdetails, avgSalary, newEmployees] =
    await queryDatabase(
      `SELECT COUNT(*) as count FROM employee_data; SELECT * FROM admin_details where admin_id=1; SELECT AVG(current_salary) as count FROM employee_data; SELECT department.name as name, employee_data.name as emp_name, t.designation_name as previous_designation, s.designation_name as current_designation, employee_data.*, project.project_name as project_name FROM employee_data, department,designation as s, designation as t, project where employee_data.department_id = department.department_id AND employee_data.current_designation_id = s.designation_id AND employee_data.previous_designation_id = t.designation_id AND employee_data.project_id = project.project_id ORDER BY date_of_joining LIMIT 1;`
    );
  console.log(
    "information",
    totalEmployees,
    HRAdetails,
    avgSalary,
    newEmployees
  );
  let results = {};
  results.total = totalEmployees;
  results.hra = HRAdetails;
  results.avg_salary = avgSalary;
  results.new_emp = newEmployees;
  console.log(results);
  res.status(200).json({ results });
});

app.get("/notifications", async (req, res) => {
  const notifications = await queryDatabase("SELECT * from notifications;");
  const todayDate = new Date().toISOString().slice(0, 10);
  ("SELECT department.name as name, employee_data.name as emp_name, t.designation_name as previous_designation, s.designation_name as current_designation, employee_data.*, project.project_name as project_name FROM employee_data, department,designation as s, designation as t, project where employee_data.department_id = department.department_id AND employee_data.current_designation_id = s.designation_id AND employee_data.previous_designation_id = t.designation_id AND employee_data.project_id = project.project_id and ");
  const recentlyInformed = await queryDatabase(
    `SELECT department.name as name, employee_data.name as emp_name, t.designation_name as previous_designation, s.designation_name as current_designation, employee_data.*, project.project_name as project_name FROM employee_data, department,designation as s, designation as t, project where employee_data.department_id = department.department_id AND employee_data.current_designation_id = s.designation_id AND employee_data.previous_designation_id = t.designation_id AND employee_data.project_id = project.project_id and last_informed BETWEEN "2023-04-07" AND DATE_ADD("2023-04-07", INTERVAL 30 DAY)`
  );

  let array = [];
  for (let notification of notifications) {
    console.log(notification.query);
    const resultData = await queryDatabase(notification.query);
    array.push({
      data: resultData,
      title: `Found ${resultData.length} employees with salary incrementation.`,
      notification_id: notification.notification_id,
    });
  }
  console.log(array);
  res.status(200).json({ recentlyInformed, message: "Success", array });
});

app.get("/increment", async (req, res) => {
  const { before, after } = req.query;
  const { id } = req.params;
  const [{ HRA, DA }] = await queryDatabase(
    `SELECT HRA,DA FROM admin_details WHERE admin_id=1`
  );
  const divider = (100 + HRA + DA) / 100;
  const empData =
    await queryDatabase(`SELECT *,employee_data.name AS emp_name,department.name AS dept_name,previous_designation.designation_name AS previous_designation_name, current_designation.designation_name AS current_designation_name
  FROM employee_data
  INNER JOIN department ON employee_data.department_id = department.department_id
  INNER JOIN designation AS previous_designation ON employee_data.previous_designation_id = previous_designation.designation_id
  INNER JOIN designation AS current_designation ON employee_data.current_designation_id = current_designation.designation_id
  INNER JOIN project ON employee_data.project_id = project.project_id
  WHERE  wef BETWEEN '${before}' AND '${after}';`);
  console.log(empData);
  empData.forEach((element) => {
    const basic = Math.round(element.current_salary / divider);
    if (7650 < basic < 8900) {
      element.increment = Math.round((basic + 250) * divider);
    }
    if (8900 < basic < 10350) {
      element.increment = Math.round((basic + 290) * divider);
    }
    if (10350 < basic < 12000) {
      element.increment = Math.round((basic + 330) * divider);
    }
    if (12000 < basic < 13850) {
      element.increment = Math.round((basic + 370) * divider);
    }
    if (13850 < basic < 15950) {
      element.increment = Math.round((basic + 420) * divider);
    }
    if (15950 < basic < 18300) {
      element.increment = Math.round((basic + 470) * divider);
    }
    if (18300 < basic < 20950) {
      element.increment = Math.round((basic + 530) * divider);
    }
    if (20950 < basic < 23900) {
      element.increment = Math.round((basic + 590) * divider);
    }
    if (23900 < basic < 27250) {
      element.increment = Math.round((basic + 670) * divider);
    }
    if (27250 < basic < 31000) {
      element.increment = Math.round((basic + 750) * divider);
    }
    if (31000 < basic < 35150) {
      element.increment = Math.round((basic + 830) * divider);
    }
    if (35150 < basic < 39700) {
      element.increment = Math.round((basic + 910) * divider);
    }
    if (39700 < basic < 44650) {
      element.increment = Math.round((basic + 990) * divider);
    }
    if (44650 < basic < 50100) {
      element.increment = Math.round((basic + 1090) * divider);
    }
    if (50100 < basic < 56050) {
      element.increment = Math.round((basic + 1190) * divider);
    }
    if (56050 < basic < 65080) {
      element.increment = Math.round((basic + 1290) * divider);
    }
    if (65080 < basic < 74810) {
      element.increment = Math.round((basic + 1390) * divider);
    }
    if (74810 < basic < 85380) {
      element.increment = Math.round((basic + 1510) * divider);
    }
    if (85380 < basic < 91900) {
      element.increment = Math.round((basic + 1630) * divider);
    }
  });
  const data = { empData: empData };
  console.log(data);
  res.json(data);
});

app.patch("/increment/update", async (req, res) => {
  const data = req.body;
  console.log(data);
  const [{ HRA, DA }] = await queryDatabase(
    `SELECT HRA,DA FROM admin_details WHERE admin_id=1`
  );
  const divider = (100 + HRA + DA) / 100;
  var todayDate = new Date(new Date().setFullYear(new Date().getFullYear()))
    .toISOString()
    .slice(0, 10);
  var wefDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1))
    .toISOString()
    .slice(0, 10);
  for (let record of data) {
    const basic = Math.round(record.increment / divider);
    let query = `UPDATE employee_data SET current_salary=${record.increment},wef="${wefDate}",Basic_Salary=${basic} WHERE id="${record.id}"; UPDATE salary set status="old" WHERE employee_id="${record.id}"; INSERT INTO SALARY (wef_date,employee_id,salary,status) VALUES("${wefDate}","${record.id}",${record.increment},"current");`;
    console.log(query);
    const response = await queryDatabase(query);
  }
  res.status(200).json({ message: "Sucesss" });
});

app.put("/notifications/:id", async (req, res) => {
  const { id } = req.params;
  const response = await queryDatabase(
    `DELETE FROM notifications where notification_id=${id}`
  );
  res.status(200).json({ message: "Sucess" });
});

function sendMail(data, message) {
  return new Promise(async (resolve, reject) => {
    const month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const d = new Date();
    let monthName = month[d.getMonth()];
    let todayDate = new Date(new Date().setFullYear(new Date().getFullYear()))
      .toISOString()
      .slice(0, 10);
    console.log("hi");
    const response = await queryDatabase(
      `UPDATE employee_data SET last_informed="${todayDate}" WHERE id="${data.id}"`
    );
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "emsadm2023@gmail.com",
        pass: "sbaggvgoqbnozxef",
      },
    });

    var mailOptions = {
      from: "emsadm2023@gmail.com",
      to: `${data.email}`,
      subject: "Sending Email using Node.js",
      text: `Dear ${data.email},\nWe hope this email finds you well. We would like to inform you that your salary for the month of ${monthName} is due to be credited soon. Please ensure that all necessary documentation, if any, has been submitted to the HR department. Kindly note that any delays in submission may result in a delay in salary disbursement.\n\n${message} \n\nIf you have any questions or concerns regarding your salary or any other matter, please do not hesitate to contact the HR department.\n\nThank you,\n\nHR Department\nEMS`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        // res.status(400).json({message:"error"});
        reject(error);
      } else {
        console.log("Email sent: " + info.response);
        resolve(info.response);
        // req.flash("success","Email has been sent");
      }
    });
  });
}

app.post("/inform", async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    for (let i = 0; i < data.array.length; i++) {
      console.log("hi1");
      const response = await sendMail(data.array[i], data.message);
    }
    res.status(200).json({ message: "Success" });
  } catch (err) {
    res.status(400).json({ message: "error" });
  }
});

app.get("/upload", async (req, res) => {
  const [totalDepartments, totalProjects, totalDesignation] =
    await queryDatabase(
      "SELECT * FROM department; SELECT * FROM project; SELECT * FROM designation;"
    );
  console.log(totalDepartments, totalProjects, totalDesignation);
  let results = {};
  results.total_dept = totalDepartments;
  results.total_projects = totalProjects;
  results.total_designation = totalDesignation;

  res.status(200).json({ message: "Success", results });
});
app.post("/upload", async (req, res) => {
  try {
    const data = req.body;
    console.log("Form Data", data);
    const deduction = data.deduction ? data.deduction : 0;
    const retired = data.retired === "on" ? "Yes" : "No";
    const remarks = data.remarks === "" ? " " : data.remarks;
    const head_engineer = data.head_engineer === "" ? "" : data.head_engineer;
    const director = data.director === "" ? "" : data.director;
    let experience = "";
    if (data.months) {
      experience += `${data.months} months`;
    }
    if (data.years) {
      experience += `${data.years} years`;
    }
    const [{ HRA, DA }] = await queryDatabase(
      `SELECT HRA,DA FROM admin_details WHERE admin_id=1`
    );
    const divider = (100 + HRA + DA) / 100;
    const basic = Math.round(data.salary / divider);
    const query = `INSERT INTO employee_data (id,name,gender,department_id,email,mobile_no,date_of_joining,current_designation_id,previous_designation_id,previous_experience,qualification,year_of_course_completion,retired,wef,current_salary,remarks,head_engineer,director,project_id,deduction,Basic_Salary) VALUES("${data.id}","${data.title}", "${data.gender}", ${data.department}, "${data.email}", "${data.mobile_no}", "${data.date}",  ${data.currentDesignation}, ${data.previousDesignation}, "${experience}", "${data.qualify}", ${data.year_of_course}, "${retired}", "${data.wef_date}", ${data.salary}, "${remarks}", "${data.head_engineer}", "${data.director}", ${data.project}, ${data.deduction},${basic}); INSERT INTO salary (salary,status,wef_date,employee_id) VALUES(${data.salary}, "current", "${data.date}", "${data.id}")`;
    const response = await queryDatabase(query);
    res.status(200).json({ message: "Success" });
  } catch (err) {
    console.log(err);
    res.status(422).json({ error: err });
  }
});

app.post("/add/dept", async (req, res) => {
  const data = req.body;
  console.log("data", data);
  const response = await queryDatabase(
    `INSERT INTO department (name) VALUES ("${data.name}");`
  );
  res.status(200).json({ message: "Success" });
});

app.post("/add/designation", async (req, res) => {
  const data = req.body;
  console.log("data", data);
  const response = await queryDatabase(
    `INSERT INTO designation (designation_name) VALUES ("${data.name}");`
  );
  res.status(200).json({ message: "Success" });
});

app.post("/add/project", async (req, res) => {
  const data = req.body;
  console.log("data", data);
  const response = await queryDatabase(
    `INSERT INTO project (project_name) VALUES ("${data.name}");`
  );
  res.status(200).json({ message: "Success" });
});

app.post("/add/hra", async (req, res) => {
  const data = req.body;
  console.log("data", data);
  const [{ oldHRA, DA }] = await queryDatabase(
    `SELECT HRA,DA FROM admin_details WHERE admin_id=1`
  );
  const newHRA = parseInt(data.name);
  const olddivider = (100 + oldHRA + DA) / 100;
  const newdivider = (100 + newHRA + DA) / 100;
  const empData = await queryDatabase(
    `SELECT id,Basic_Salary FROM employee_data`
  );
  empData.forEach(async (record) => {
    const basic = record.Basic_Salary;
    const newSalary = basic * newdivider;
    await queryDatabase(
      `UPDATE employee_data SET current_salary=${newSalary} WHERE id="${record.id}"`
    );
    await queryDatabase(
      `UPDATE salary SET salary=${newSalary} WHERE employee_id="${record.id}" AND status="current"`
    );
  });
  const response = await queryDatabase(
    `UPDATE admin_details SET HRA=${newHRA} WHERE admin_id=1;`
  );
  res.status(200).json({ message: "Success" });
});

app.post("/add/da", async (req, res) => {
  const data = req.body;
  console.log("data", data);
  const [{ HRA, oldDA }] = await queryDatabase(
    `SELECT HRA,DA FROM admin_details WHERE admin_id=1`
  );
  const newDA = parseInt(data.name);
  const olddivider = (100 + HRA + oldDA) / 100;
  const newdivider = (100 + HRA + newDA) / 100;
  const empData = await queryDatabase(
    `SELECT id,Basic_Salary FROM employee_data`
  );
  empData.forEach(async (record) => {
    const basic = record.Basic_Salary;
    const newSalary = basic * newdivider;
    await queryDatabase(
      `UPDATE employee_data SET current_salary=${newSalary} WHERE id="${record.id}"`
    );
    await queryDatabase(
      `UPDATE salary SET salary=${newSalary} WHERE employee_id="${record.id}" AND status="current"`
    );
  });
  const response = await queryDatabase(
    `UPDATE admin_details SET DA=${parseInt(data.name)} WHERE admin_id=1;`
  );
  res.status(200).json({ message: "Success" });
});

app.get("/show/:id", async (req, res) => {
  const { id } = req.params;
  const [empData, salary_details] =
    await queryDatabase(`SELECT *,employee_data.name AS emp_name,department.name AS dept_name,previous_designation.designation_name AS previous_designation_name, current_designation.designation_name AS current_designation_name
  FROM employee_data
  INNER JOIN department ON employee_data.department_id = department.department_id
  INNER JOIN designation AS previous_designation ON employee_data.previous_designation_id = previous_designation.designation_id
  INNER JOIN designation AS current_designation ON employee_data.current_designation_id = current_designation.designation_id
  INNER JOIN project ON employee_data.project_id = project.project_id
  WHERE id="${id}";SELECT * FROM salary WHERE employee_id="${id}";`);
  const [totalDepartments, totalProjects, totalDesignation] =
    await queryDatabase(
      "SELECT * FROM department; SELECT * FROM project; SELECT * FROM designation;"
    );
  console.log(totalDepartments, totalProjects, totalDesignation);
  const employeeData = {};
  employeeData.employeeData = empData;
  employeeData.salary_details = salary_details;
  employeeData.total_dept = totalDepartments;
  employeeData.total_projects = totalProjects;
  employeeData.total_designation = totalDesignation;
  res.json({ employeeData });
});

app.patch("/show/:id", async (req, res) => {
  try {
    const data = req.body;
    console.log("Form Data", data);
    const deduction = data.deduction ? data.deduction : 0;
    const retired = data.retired === "on" ? "Yes" : "No";
    const remarks = data.remarks === "" ? " " : data.remarks;
    const head_engineer = data.head_engineer === "" ? "" : data.head_engineer;
    const director = data.director === "" ? "" : data.director;
    let experience = "";
    if (data.months) {
      experience += `${data.months} months`;
    }
    if (data.years) {
      experience += `${data.years} years`;
    }
    const [{ HRA, DA }] = await queryDatabase(
      `SELECT HRA,DA FROM admin_details WHERE admin_id=1`
    );
    const divider = (100 + HRA + DA) / 100;
    const basic = Math.round(data.salary / divider);
    const query = `UPDATE employee_data SET name = "${data.title}" ,gender ="${data.gender}" ,department_id = ${data.department}, email = "${data.email}" , mobile_no = "${data.mobile_no}", date_of_joining = "${data.date}" , current_designation_id = ${data.currentDesignation} , previous_designation_id = ${data.previousDesignation}, previous_experience = "${experience}" ,qualification = "${data.qualify}" ,year_of_course_completion = ${data.year_of_course}, retired = "${retired}" , wef = "${data.wef_date}" , current_salary = ${data.salary}, remarks = "${remarks}" , head_engineer = "${data.head_engineer}" , director = "${data.director}" ,project_id = ${data.project}, deduction = ${data.deduction},Basic_Salary=${basic} WHERE id="${data.id}"; UPDATE salary set salary=${data.salary}, wef_date="${data.wef_date}" WHERE employee_id="${data.id}";`;
    console.log(query);
    const response = await queryDatabase(query);
    res.status(200).json({ message: "Success" });
  } catch (err) {
    console.log(err);
    res.status(422).json({ error: err });
  }
});

app.put("/show/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id, "id");
    const result = await queryDatabase(
      `SET FOREIGN_KEY_CHECKS = 0; DELETE FROM employee_data where id="${id}";`
    );
    res.status(200).json({ message: "Sucess" });
  } catch (err) {
    console.log(err);
    res.status(422).json({ message: "error" });
  }
});
app.listen(7000, () => {
  console.log("LISTENING ON PORT 7000!");
});
