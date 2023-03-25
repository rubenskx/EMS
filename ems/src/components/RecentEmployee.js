import { Fragment } from "react";
import classes from "./RecentEmployee.module.css";
import Card from "../UI/Card";

const RecentEmployees = props => {
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
              </tr>
              {props.employees.map((ele, id) => (
                <tr className={classes.row}>
                  <td>{id}</td>
                  <td>{ele.name}</td>
                  <td>{ele.department}</td>
                  <td>{ele.mobile}</td>
                  {props.addArray &&
                    props.addArray.map((keys) => <td>{ele[keys]}</td>)}
                </tr>
              ))}
            </table>
          </div>
        </Card>
      </Fragment>
    );
}

export default RecentEmployees;