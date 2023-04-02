import Card from "../UI/Card";
import classes from "./SearchForm.module.css";
import {
  Form,
  useNavigate,
  useNavigation,
  useActionData,
} from "react-router-dom";
import { Fragment, useState } from "react";
import { AiOutlinePlus, AiOutlineMinus, AiOutlineSend } from "react-icons/ai";
import TextArea from "../UI/TextArea";
import Flash from "../UI/Flash";

const Upload = (props) => {
  const { formdata } = props;
  const [toggler, setToggler] = useState();
  const [text, setText] = useState([true, true, true]);
  const [flashMessage, setFlashMessage] = useState("");
  const [sendData, setSendData] = useState(["", "", ""]);
  const navigate = useNavigate();
  const navigation = useNavigation();
  const data = useActionData();

  const isSubmitting = navigation.state === "submitting";
  function cancelHandler() {
    navigate("..");
  }

  const invertArray = (id) => {
    let array = [...text];
    array[id] = !array[id];
    setText(array);
  };

  function handleTextAreaChange(value, type) {
    let array = [...sendData];
    array[type] = value;
    setSendData(array);
  }

  const submitFields = async (type) => {
    setFlashMessage("");
    let object = {};
    let url = "http://localhost:7000/";
    if (type === 0) {
      console.log("dept", sendData[0]);
      object.name = sendData[0];
      url = url + "add/dept";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(object),
      });

      if (!response.ok) {
      }
      setFlashMessage("The department was successfully added.");
      invertArray(type);
    }
    if (type === 1) {
      console.log("design", sendData[1]);
      url = url + "add/designation";
      object.name = sendData[1];
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(object),
      });

      if (!response.ok) {
        console.log("error");
      }
      setFlashMessage("The designation was successfully added.");
      invertArray(type);
    }
    if (type === 2) {
      console.log("project", sendData[2]);
      url = url + "add/project";
      object.name = sendData[2];
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(object),
      });

      if (!response.ok) {
        console.log("error");
      }
      setFlashMessage("The project was successfully added.");
      invertArray(type);
    }
  };

  return (
    <Fragment>
      {flashMessage !== "" && <Flash>{flashMessage}</Flash>}
      {data && data.message && <p style={{ color: "red" }}>{data.message}</p>}
      <Form className={classes.form} method={"POST"}>
        <Card>
          <div className="mb-4">
            <span className={classes.left}>Add Department</span>
            <span className={classes.right}>
              {!text[0] && (
                <AiOutlineSend size={30} onClick={() => submitFields(0)} />
              )}
              {text[0] && (
                <AiOutlinePlus size={30} onClick={() => invertArray(0)} />
              )}
              {!text[0] && (
                <AiOutlineMinus size={30} onClick={() => invertArray(0)} />
              )}
            </span>
          </div>
          {!text[0] && (
            <TextArea onTextChange={handleTextAreaChange} type={0} />
          )}
        </Card>
        <Card>
          <div className="mb-4">
            <span className={classes.left}>Add Designation</span>
            <span className={classes.right}>
              {!text[1] && (
                <AiOutlineSend size={30} onClick={() => submitFields(1)} />
              )}
              {text[1] && (
                <AiOutlinePlus size={30} onClick={() => invertArray(1)} />
              )}
              {!text[1] && (
                <AiOutlineMinus size={30} onClick={() => invertArray(1)} />
              )}
            </span>
          </div>
          {!text[1] && (
            <TextArea onTextChange={handleTextAreaChange} type={1} />
          )}
        </Card>
        <Card>
          <div className="mb-4">
            <span className={classes.left}>Add Project Name</span>
            <span className={classes.right}>
              {!text[2] && (
                <AiOutlineSend size={30} onClick={() => submitFields(2)} />
              )}
              {text[2] && (
                <AiOutlinePlus size={30} onClick={() => invertArray(2)} />
              )}
              {!text[2] && (
                <AiOutlineMinus size={30} onClick={() => invertArray(2)} />
              )}
            </span>
          </div>
          {!text[2] && (
            <TextArea onTextChange={handleTextAreaChange} type={2} />
          )}
        </Card>
        <Card>
          {props.type ? <h2>Edit</h2> : <h2>Add an Employee</h2>}
          <p>
            <label htmlFor="id">ID</label>
            <input id="id" type="text" name="id" required />
          </p>
          <p>
            <label htmlFor="title">Name</label>
            <input id="title" type="text" name="title" required />
          </p>
          <p>
            <label htmlFor="gender">Gender</label>
            <select
              name="gender"
              class="form-select"
              aria-label="Default select example"
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
            />
          </p>
          <p>
            <label htmlFor="date">Date Of Joining</label>
            <input id="date" type="date" name="date" required />
          </p>
          <p>
            <label htmlFor="previousDesignation">Previous Designation</label>
            <select
              name="previousDesignation"
              class="form-select"
              aria-label="Default select example"
              required
            >
              <option selected>Choose...</option>
              {formdata.total_designation.map((ele, id) => (
                <option value={ele.designation_id}>
                  {ele.designation_name}
                </option>
              ))}
            </select>
          </p>
          <p>
            <label htmlFor="currentDesignation">Current Designation</label>
            <select
              name="currentDesignation"
              class="form-select"
              aria-label="Default select example"
              required
            >
              <option selected>Choose...</option>
              {formdata.total_designation.map((ele, id) => (
                <option value={ele.designation_id}>
                  {ele.designation_name}
                </option>
              ))}
            </select>
          </p>
          <p className="row">
            <label htmlFor="experience">Experience</label>
            <div className="row col-lg-6">
              <div
                className={
                  (toggler === 1 ? classes.toggler : " ") + " col-lg-6"
                }
                onClick={() => (toggler !== 1 ? setToggler(1) : setToggler(0))}
              >
                Months
              </div>
              <div
                className={
                  (toggler === 2 ? classes.toggler : " ") + " col-lg-6"
                }
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
            />
          </p>
          <p>
            <label htmlFor="year_of_course">Year of Completion</label>
            <input id="year_of_course" type="number" name="year_of_course" />
          </p>
          <div className="row">
            <div
              className={
                classes.adjust + " form-check form-switch mb-2 col-lg-6"
              }
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
                  required
                />
              </p>
            </div>
          </div>
          <p>
            <label htmlFor="wef_date">WEF</label>
            <input id="wef" type="date" name="wef_date" required />
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
              required
            />
          </p>
          <p className="mt-2">
            <label htmlFor="remarks">Remarks</label>
            <textarea id="remarks" type="text" name="remarks" defaultValue="" />
          </p>
          <p>
            <label htmlFor="head">Head Engineer</label>
            <input
              name="head_engineer"
              type="text"
              class="form-control"
              id="head_engineer"
              placeholder="Enter the Head Engineer.."
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
            />
          </p>
          <p className="mt-2">
            <label htmlFor="project">Project Name </label>
            <select
              name="project"
              class="form-select"
              aria-label="Default select example"
              required
            >
              <option selected>Choose...</option>
              {formdata.total_projects.map((ele, id) => (
                <option value={ele.project_id}>{ele.project_name}</option>
              ))}
            </select>
          </p>
          <div className={classes.actions}>
            <button
              type="button"
              onClick={cancelHandler}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </Card>
      </Form>
    </Fragment>
  );
};

export default Upload;
