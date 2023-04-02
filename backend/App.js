const express = require("express");
const app = express();
const path = require("path");
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const cors = require("cors");
const cron = require("node-cron");
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

app.get("/login", async (req, res) => {
  const data = req.body;
  const username = data.username;
  const password = bcrypt.hashSync(data.password, 10);
  const query = `SELECT * FROM admin_details`;
  connection.query(query, (err, rows) => {
    if (err) throw(err);
    else
    {
      if(rows[0][0] === username && rows[0][1] === password){
        return res.status(201).json({ username: `${username}`, password: `${password}`});
      } else {
        return res.status(401).json({ message: `The username or password is incorrect.`});
      }
    }
  })
});

function runQuery() {
  const date = new Date();
  const day = date.getDate();
  const todayDate = new Date().toISOString().slice(0, 10);
  const query = `SELECT * FROM employee_data WHERE wef BETWEEN DATE_ADD("${todayDate}", INTERVAL 30 DAY) AND "${todayDate}"`;
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
  try {
    const data = req.body;
    res.status(200).json({ message: "Success", employees });
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

app.get("/home", async (req, res) => {
  console.log("home");
  const [totalEmployees, RetiredEmployees, avgSalary, newEmployees] =
    await queryDatabase(
      `SELECT COUNT(*) as count FROM employee_data; SELECT COUNT(*) as count FROM employee_data WHERE retired="Yes"; SELECT AVG(current_salary) as count FROM employee_data; SELECT department.name as department, employee_data.* FROM employee_data, department where employee_data.department_id = department.department_id ORDER BY date_of_joining LIMIT 5;`
    );
  console.log(
    "information",
    totalEmployees,
    RetiredEmployees,
    avgSalary,
    newEmployees
  );
  let results = {};
  results.total = totalEmployees;
  results.retired = RetiredEmployees;
  results.avg_salary = avgSalary;
  results.new_emp = newEmployees;
  console.log(results);
  res.status(200).json({ results });
});

app.get("/notifications", async (req, res) => {
  const notifications = await queryDatabase("SELECT * from notifications;");
  let array = [];
  for (let notification of notifications) {
    const resultData = await queryDatabase(notification.query);
    array.push({
      data: resultData,
      title: `Found ${resultData.length} employees with salary incrementation.`,
      notification_id: notification.notification_id,
    });
  }
  console.log(array);
  res.status(200).json({ message: "Success", array });
});

app.get("/increment", async (req, res) => {
  res.status(200).json({ message: "Success", employees });
});

app.put("/notifications/:id", async (req, res) => {
  const { id } = req.params;
  const response = await queryDatabase(
    `DELETE FROM notifications where notification_id=${id}`
  );
  res.status(200).json({ message: "Sucess" });
});
app.post("/inform", async (req, res) => {
  const data = req.body;
  console.log(data);
  res.status(200).json({ message: "Success" });
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

    const query = `INSERT INTO employee_data (id,name,gender,department_id,email,mobile_no,date_of_joining,current_designation_id,previous_designation_id,previous_experience,qualification,year_of_course_completion,retired,wef,current_salary,remarks,head_engineer,director,project_id,deduction) VALUES("${data.id}","${data.title}", "${data.gender}", ${data.department}, "${data.email}", "${data.mobile_no}", "${data.date}",  ${data.currentDesignation}, ${data.previousDesignation}, "${experience}", "${data.qualify}", ${data.year_of_course}, "${retired}", "${data.wef_date}", ${data.salary}, "${remarks}", "${data.head_engineer}", "${data.director}", ${data.project}, ${data.deduction}); INSERT INTO salary (salary,status,wef_date,employee_id) VALUES(${data.salary}, "current", "${data.wef_date}", "${data.id}")`;
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

app.get('/show/:id',async (req, res) => {
  const {id}=req.params;
  const [empData,salary_details]=await queryDatabase(`SELECT *,employee_data.name AS emp_name,department.name AS dept_name,previous_designation.designation_name AS previous_designation_name, current_designation.designation_name AS current_designation_name
  FROM employee_data
  INNER JOIN department ON employee_data.department_id = department.department_id
  INNER JOIN designation AS previous_designation ON employee_data.previous_designation_id = previous_designation.designation_id
  INNER JOIN designation AS current_designation ON employee_data.current_designation_id = current_designation.designation_id
  INNER JOIN project ON employee_data.project_id = project.project_id
  WHERE id=${id};SELECT * FROM salary WHERE employee_id=${id};`);
  const [totalDepartments, totalProjects, totalDesignation] =
    await queryDatabase(
      "SELECT * FROM department; SELECT * FROM project; SELECT * FROM designation;"
    );
  console.log(totalDepartments, totalProjects, totalDesignation);
  const employeeData={};
  employeeData.employeeData=empData;
  employeeData.salary_details=salary_details;
  employeeData.total_dept = totalDepartments;
  employeeData.total_projects = totalProjects;
  employeeData.total_designation  = totalDesignation;
  res.json({employeeData})
});

app.patch("/show/:id", async(req,res) => {
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

  const query = `UPDATE employee_data SET name = "${data.title}" ,gender ="${data.gender}" ,department_id = ${data.department}, email = "${data.email}" , mobile_no = "${data.mobile_no}", date_of_joining = "${data.date}" , current_designation_id = ${data.currentDesignation} , previous_designation_id = ${data.previousDesignation}, previous_experience = "${experience}" ,qualification = "${data.qualify}" ,year_of_course_completion = ${data.year_of_course}, retired = "${retired}" , wef = "${data.wef_date}" , current_salary = ${data.salary}, remarks = "${remarks}" , head_engineer = "${data.head_engineer}" , director = "${data.director}" ,project_id = ${data.project}, deduction = ${data.deduction} WHERE id="${data.id}"; UPDATE salary set salary=${data.salary}, wef_date="${data.wef_date}" WHERE employee_id="${data.id}";`;
  console.log(query);
  const response = await queryDatabase(query);
  res.status(200).json({ message: "Success" });
} catch (err) {
  console.log(err);
  res.status(422).json({ error: err });
}
})
app.listen(7000, () => {
  console.log("LISTENING ON PORT 7000!");
});
