import { Form, useNavigate, useNavigation} from "react-router-dom";
import Card from "../UI/Card";
import { useState } from "react";
import classes from "./SearchForm.module.css";
import ButtonUI from "../UI/ButtonUI";

const CommonForm = (props) => {
  const { formdata } = props;
  console.log("inside form",formdata);
  const [toggler, setToggler] = useState();
  const navigate = useNavigate();
  const navigation = useNavigation();
  
  const isSubmitting = navigation.state === "submitting";
  function cancelHandler() {
    navigate("..");
  }
  return (
    <Form className={classes.form} method={props.method}>
      {props.children}
      <Card>
        {props.type ? <h2>Edit</h2> : <h2>Add an Employee</h2>}
        <p>
          <label htmlFor="id">ID</label>
          <input
            id="id"
            type="text"
            name="id"
            defaultValue={
              props.formdata && props.formdata.employeeData
                ? props.formdata.employeeData[0].id
                : ""
            }
            required
          />
        </p>
        <p>
          <label htmlFor="title">Name</label>
          <input
            id="title"
            type="text"
            name="title"
            required
            defaultValue={
              props.formdata && props.formdata.employeeData
                ? props.formdata.employeeData[0].emp_name
                : ""
            }
          />
        </p>
        <p>
          <label htmlFor="gender">Gender</label>
          <select
            name="gender"
            class="form-select"
            aria-label="Default select example"
            defaultValue={
              props.formdata && props.formdata.employeeData
                ? props.formdata.employeeData[0].gender
                : ""
            }
            required
          >
            <option disabled selected value>
              -- select an option --
            </option>
            <option value="M">Male</option>
            <option value="F">Female</option>
            <option value="U">Unspecified</option>
          </select>
        </p>
        <p>
          <label htmlFor="department">Department</label>
          <select
            name="department"
            class="form-select"
            aria-label="Default select example"
            defaultValue={
              props.formdata && props.formdata.employeeData
                ? props.formdata.employeeData[0].department_id
                : ""
            }
            required
          >
            <option selected>Choose...</option>
            {formdata.total_dept.map((ele, id) => (
              <option value={ele.department_id}>{ele.name}</option>
            ))}
          </select>
        </p>
        <p>
          <label htmlFor="mobile_no">Mobile No</label>
          <input
            name="mobile_no"
            type="text"
            class="form-control"
            id="mobile_no"
            placeholder="Enter the mobile no .."
            defaultValue={
              props.formdata && props.formdata.employeeData
                ? props.formdata.employeeData[0].mobile_no
                : ""
            }
          />
        </p>
        <p>
          <label htmlFor="date">Date Of Joining</label>
          <input
            id="date"
            type="date"
            name="date"
            required
            defaultValue={
              props.formdata && props.formdata.employeeData
                ? props.formdata.employeeData[0].date_of_joining.substring(
                    0,
                    10
                  )
                : ""
            }
          />
        </p>
        <p>
          <label htmlFor="previousDesignation">Previous Designation</label>
          <select
            name="previousDesignation"
            class="form-select"
            aria-label="Default select example"
            defaultValue={
              props.formdata && props.formdata.employeeData
                ? props.formdata.employeeData[0].previous_designation_id
                : ""
            }
            required
          >
            <option selected>Choose...</option>
            {formdata.total_designation.map((ele, id) => (
              <option value={ele.designation_id}>{ele.designation_name}</option>
            ))}
          </select>
        </p>
        <p>
          <label htmlFor="currentDesignation">Current Designation</label>
          <select
            name="currentDesignation"
            class="form-select"
            aria-label="Default select example"
            defaultValue={
              props.formdata && props.formdata.employeeData
                ? props.formdata.employeeData[0].current_designation_id
                : ""
            }
            required
          >
            <option selected>Choose...</option>
            {formdata.total_designation.map((ele, id) => (
              <option value={ele.designation_id}>{ele.designation_name}</option>
            ))}
          </select>
        </p>
        <p className="row">
          <label htmlFor="experience">Experience</label>
          <div className="row col-lg-6">
            <div
              className={(toggler === 1 ? classes.toggler : " ") + " col-lg-6"}
              onClick={() => (toggler !== 1 ? setToggler(1) : setToggler(0))}
            >
              Months
            </div>
            <div
              className={(toggler === 2 ? classes.toggler : " ") + " col-lg-6"}
              onClick={() => (toggler !== 2 ? setToggler(2) : setToggler(0))}
            >
              Years
            </div>
          </div>
          <div className="col-lg-6">
            {toggler === 2 && (
              <>
                <label htmlFor="years" style={{ display: "inline" }}>
                  Years:
                </label>
                <input
                  name="years"
                  type="number"
                  class="form-control"
                  id="years"
                  placeholder="Years.."
                />
              </>
            )}
            {toggler === 1 && (
              <>
                <label htmlFor="months" style={{ display: "inline" }}>
                  Months:
                </label>
                <input
                  name="months"
                  type="number"
                  class="form-control"
                  id="months"
                  placeholder="Months.."
                />
              </>
            )}
          </div>
        </p>
        <p>
          <label htmlFor="qualify">Qualification</label>
          <input
            name="qualify"
            type="text"
            class="form-control"
            id="qualify"
            placeholder="Enter the qualification.."
            defaultValue={
              props.formdata && props.formdata.employeeData
                ? props.formdata.employeeData[0].qualification
                : ""
            }
          />
        </p>
        <p>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="email"
            class="form-control"
            id="email"
            placeholder="Enter the email ID.."
            defaultValue={
              props.formdata && props.formdata.employeeData
                ? props.formdata.employeeData[0].email
                : ""
            }
          />
        </p>
        <p>
          <label htmlFor="year_of_course">Year of Completion</label>
          <input
            id="year_of_course"
            type="number"
            name="year_of_course"
            defaultValue={
              props.formdata && props.formdata.employeeData
                ? props.formdata.employeeData[0].year_of_course_completion
                : ""
            }
          />
        </p>
        <div className="row">
          <div
            className={classes.adjust + " form-check form-switch mb-2 col-lg-6"}
          >
            <input
              class="form-check-input"
              type="checkbox"
              role="switch"
              id="retired"
              name="retired"
            />
            <label class="form-check-label" for="retired">
              Retired?
            </label>
          </div>
          <div className={classes.adjust + " form-check col-lg-4"}>
            <p>
              <label htmlFor="deduction" style={{ display: "inline" }}>
                Deduction:
              </label>
              <input
                name="deduction"
                type="number"
                class="form-control"
                id="deduction"
                placeholder="Enter the deduction%.."
                defaultValue={
                  props.formdata && props.formdata.employeeData
                    ? props.formdata.employeeData[0].deduction
                    : ""
                }
                required
              />
            </p>
          </div>
        </div>
        <p>
          <label htmlFor="wef_date">WEF</label>
          <input
            id="wef"
            type="date"
            name="wef_date"
            defaultValue={
              props.formdata && props.formdata.employeeData
                ? props.formdata.employeeData[0].wef.substring(0, 10)
                : ""
            }
            required
          />
        </p>
        <p>
          <label htmlFor="salary" style={{ display: "inline" }}>
            Salary:
          </label>
          <input
            name="salary"
            type="number"
            class="form-control"
            id="salary"
            placeholder="Enter the salary.."
            defaultValue={
              props.formdata && props.formdata.employeeData
                ? props.formdata.employeeData[0].current_salary
                : ""
            }
            required
          />
        </p>
        <p className="mt-2">
          <label htmlFor="remarks">Remarks</label>
          <textarea
            id="remarks"
            type="text"
            name="remarks"
            defaultValue={
              props.formdata && props.formdata.employeeData
                ? props.formdata.employeeData[0].remarks
                : ""
            }
          />
        </p>
        <p>
          <label htmlFor="head">Head Engineer</label>
          <input
            name="head_engineer"
            type="text"
            class="form-control"
            id="head_engineer"
            placeholder="Enter the Head Engineer.."
            defaultValue={
              props.formdata && props.formdata.employeeData
                ? props.formdata.employeeData[0].head_engineer
                : ""
            }
          />
        </p>
        <p>
          <label htmlFor="director">Director</label>
          <input
            name="director"
            type="text"
            class="form-control"
            id="director"
            placeholder="Enter the Director .."
            defaultValue={
              props.formdata && props.formdata.employeeData
                ? props.formdata.employeeData[0].director
                : ""
            }
          />
        </p>
        <p className="mt-2">
          <label htmlFor="project">Project Name </label>
          <select
            name="project"
            class="form-select"
            aria-label="Default select example"
            defaultValue={
              props.formdata && props.formdata.employeeData
                ? props.formdata.employeeData[0].project_id
                : ""
            }
            required
          >
            <option selected>Choose...</option>
            {formdata.total_projects.map((ele, id) => (
              <option value={ele.project_id}>{ele.project_name}</option>
            ))}
          </select>
        </p>
        <p>
          <label htmlFor="hra" style={{ display: "inline" }}>
            HRA %:
          </label>
          <input
            name="hra"
            type="number"
            class="form-control"
            id="hra"
            placeholder="Enter the hra%.."
            defaultValue={
              props.formdata && props.formdata.employeeData
                ? props.formdata.employeeData[0].hra
                : ""
            }
            required
          />
        </p>
        <p>
          <label htmlFor="da" style={{ display: "inline" }}>
            DA %:
          </label>
          <input
            name="da"
            type="number"
            class="form-control"
            id="da"
            placeholder="Enter the da%.."
            defaultValue={
              props.formdata && props.formdata.employeeData
                ? props.formdata.employeeData[0].da
                : ""
            }
            required
          />
        </p>
        <div className={classes.actions}>
          <ButtonUI onClick={cancelHandler} disabled={isSubmitting} color="red">
            Cancel
          </ButtonUI>
          <ButtonUI disabled={isSubmitting} color="green">
            {isSubmitting ? "Submitting..." : "Submit"}
          </ButtonUI>
        </div>
      </Card>
    </Form>
  );
};

export default CommonForm;
