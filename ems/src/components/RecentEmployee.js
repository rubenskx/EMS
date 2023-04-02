import { Fragment } from "react";
import classes from "./RecentEmployee.module.css";
import Card from "../UI/Card";
import { NavLink } from "react-router-dom";

const RecentEmployees = (props) => {
  return (
    <Fragment>
      <Card>
        <div className={classes.table}>
          <table>
            <tr className={classes.row + " " + classes.header}>
              <th>ID</th>
              <th>Name</th>
              <th>Department</th>
              <th>Mobile No</th>
              {props.addArray && props.addArray.map((ele) => <th>{ele}</th>)}
              {props.checked && <th>Checked?</th>}
            </tr>
            {props.employees.map((ele, id) => (
              <tr className={classes.row}>
                <td>{ele.id}</td>
                <NavLink
                  to={`/search-form/${ele.id}`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <td>{ele.name}</td>
                </NavLink>
                <td>{ele.department}</td>
                <td>{ele.mobile_no}</td>
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
