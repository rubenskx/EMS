import { Fragment } from "react";
import classes from "./RecentEmployee.module.css";
import Card from "../UI/Card";
const employees = [
  {
    id: 1,
    name: "Ruben Sinu",
    department: "Tech",
    mobile: "+91 891287893",
  },
  {
    id: 2,
    name: "Abhay Unni",
    department: "Tech",
    mobile: "+91 891287893",
  },
  {
    id: 3,
    name: "Vishnu V Nair",
    department: "Tech",
    mobile: "+91 891287893",
  },
];
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
              </tr>
              {employees.map((ele, id) => (
                <tr className={classes.row}>
                  <td>{id}</td>
                  <td>{ele.name}</td>
                  <td>{ele.department}</td>
                  <td>{ele.mobile}</td>
                </tr>
              ))}
            </table>
          </div>
        </Card>
      </Fragment>
    );
}

export default RecentEmployees;