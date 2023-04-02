import { Fragment } from "react";
import classes from "./RecentEmployee.module.css";
import Card from "../UI/Card";
import { NavLink } from "react-router-dom";

const RecentEmployees = (props) => {
  return (
    <Fragment>
      <Card>
        <div className={classes.table} >
          <table>
            <tr className={classes.row + " " + classes.header}>
              <th>ID</th>
              <th>Name</th>
              <th>Mobile_No</th>
              <th>Gender</th>
              <th>Date of Joining</th>
              <th>Qualification</th>
              <th>Previous Experience</th>
              <th>Year Of Course Completion</th>
              <th>Previous Designation</th>
              <th>Retired</th>
              <th>Current Salary</th>
              <th>W.E.F</th>
              <th>Deduction</th>
              <th>Remarks</th>
              <th>Head Engineer</th>
              <th>Director</th>
              <th>Email</th>
              <th>Department</th>
              <th>Project</th>
              <th>Current Designation</th>
              {props.addArray && props.addArray.map((ele) => <th>{ele}</th>)}
              {props.checked && <th>Checked?</th>}
            </tr>
            {props.employees.map((ele, id) => (
              <tr className={classes.row}>
                <td>{ele.id}</td>
                <NavLink
                  to={`/search-form/${id}`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <td>{ele.emp_name}</td>
                </NavLink>
                <td>{ele.mobile_no}</td>
                <td>{ele.gender}</td>
                <td>{ele.date_of_joining.substring(0,10)}</td>
                <td>{ele.qualification}</td>
                <td>{ele.previous_experience}</td>
                <td>{ele.year_of_course_completion}</td>
                <td>{ele.previous_designation_name}</td>
                <td>{ele.retired}</td>
                <td>{ele.current_salary}</td>
                <td>{ele.wef.substring(0,10)}</td>
                <td>{ele.deduction}</td>
                <td>{ele.remarks}</td>
                <td>{ele.head_engineer}</td>
                <td>{ele.director}</td>
                <td>{ele.email}</td>
                <td>{ele.dept_name}</td>
                <td>{ele.project_name}</td>
                <td>{ele.current_designation_name}</td>
                {props.addArray &&
                  props.addArray.map((keys) => <td>{ele[keys]}</td>)}
                {props.checked && (
                  <>
                    <div class="px-5 form-check text-center">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                        onClick={() => props.onClick(ele.id)}
                      />
                    </div>
                  </>
                )}
              </tr>
            ))}
          </table>
        </div>
      </Card>
    </Fragment>
  );
};

export default RecentEmployees;
