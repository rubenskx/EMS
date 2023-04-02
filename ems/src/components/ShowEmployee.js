import Card from "../UI/Card";
import { AiOutlineEdit } from "react-icons/ai";
import classes from "./ShowEmployee.module.css";
import { useNavigate } from "react-router-dom";
import LineChart from "./Chart";
import ButtonUI from "../UI/ButtonUI";
import { useState } from "react";
const ShowEmployee = (props) => {
  const navigate = useNavigate();
  const emp=props.results.employeeData[0];
  const salaryDetails=props.results.salary_details
  console.log(emp,salaryDetails);
  const [toggler, setToggler] = useState(false);
  const editPageGenerator = (id) => {
    navigate(`/search-form/${id}/edit`);
  };
  return (
    <>
      <div className="container">
        <Card>
          <div className="row">
            <div style={{ textAlign: "left" }} className="col-lg-11">
              <h2>{emp.emp_name}</h2>
              <p>{emp.current_designation_name}</p>
            </div>
            <div style={{ textAlign: "right" }} className="col-lg-1">
              <AiOutlineEdit size={30} onClick={() => editPageGenerator(0)} />
            </div>
          </div>
          <div className="row container">
            <div className="col-lg-4">
              <div>
                <label htmlFor="name" className={classes.bold + " mt-3"}>
                  Name
                </label>
                <div>{emp.emp_name}</div>
              </div>
              <div>
                <label htmlFor="name" className={classes.bold + " mt-3"}>
                  Email
                </label>
                <div>{emp.email}</div>
              </div>
              <div>
                <label htmlFor="number" className={classes.bold + " mt-3"}>
                  Mobile Number
                </label>
                <div>{emp.mobile_no}</div>
              </div>
              <div>
                <label htmlFor="number" className={classes.bold + " mt-3"}>
                  Department
                </label>
                <div>{emp.dept_name}</div>
              </div>
              <div>
                <label htmlFor="number" className={classes.bold + " mt-3"}>
                  Retired
                </label>
                <div>{emp.retired}</div>
              </div>
              <div>
                <label
                  htmlFor="head_engineer"
                  className={classes.bold + " mt-3"}
                >
                  Head Enginner
                </label>
                <div>{emp.head_engineer}</div>
              </div>
            </div>
            <div className="col-lg-4">
              <div>
                <label htmlFor="gender" className={classes.bold + " mt-3"}>
                  Gender
                </label>
                <div>{emp.gender}</div>
              </div>
              <div>
                <label htmlFor="date" className={classes.bold + " mt-3"}>
                  Date Of Joining
                </label>
                <div>{emp.date_of_joining.substring(0, 10)}</div>
              </div>
              <div>
                <label htmlFor="designation" className={classes.bold + " mt-3"}>
                  Current Designation
                </label>
                <div>{emp.current_designation_name} </div>
              </div>
              <div>
                <label htmlFor="salary" className={classes.bold + " mt-3"}>
                  Current Salary
                </label>
                <div>{emp.current_salary}</div>
              </div>
              <div>
                <label htmlFor="number" className={classes.bold + " mt-3"}>
                  WEF Date
                </label>
                <div>{emp.wef.substring(0, 10)}</div>
              </div>
              <div>
                <label htmlFor="director" className={classes.bold + " mt-3"}>
                  Director
                </label>
                <div>{emp.director}</div>
              </div>
            </div>
            <div className="col-lg-4" style={{ paddingLeft: "50px" }}>
              <div>
                <label htmlFor="da" className={classes.bold + " mt-3"}>
                  DA 76%
                </label>
                <div>{Math.round((emp.current_salary/1.86)*0.76)}</div>
              </div>
              <div>
                <label htmlFor="hra" className={classes.bold + " mt-3"}>
                  HRA 10%
                </label>
                <div>{Math.round((emp.current_salary/1.86)*0.1)}</div>
              </div>
              <div>
                <label htmlFor="salary" className={classes.bold + " mt-3"}>
                  Remarks
                </label>
                <p>{emp.remarks}</p>
              </div>
              <div>
                <label htmlFor="deduction" className={classes.bold}>
                  % Of Deduction
                </label>
                <div>{emp.deduction}</div>
              </div>
              <div>
                <label htmlFor="project" className={classes.bold}>
                  Project
                </label>
                <div>{emp.project_name}</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
      <div className="text-center mt-5">
        {!toggler && (
          <ButtonUI onClick={() => setToggler(!toggler)}>
            Show Salary Details
          </ButtonUI>
        )}
        {toggler && (
          <ButtonUI onClick={() => setToggler(!toggler)}>
            Hide Salary Details
          </ButtonUI>
        )}
      </div>
      {toggler && (
        <div className="container">
          <Card>
            <div style={{ textAlign: "left" }}>
              <h2>Salary History</h2>
              <p>Brief analysis of employee salary.</p>
            </div>
            <LineChart salaryDetails={salaryDetails}/>
          </Card>
        </div>
      )}
    </>
  );
};

export default ShowEmployee;
