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

const Upload = (props) => {
  const [toggler, setToggler] = useState();
  const [text, setText] = useState([true, true, true]);
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

  const submitFields = (type) => {
    if (type === 0) {
      console.log("dept", sendData[0]);
      invertArray(type);
    }
    if (type === 1) {
      console.log("design", sendData[1]);
      invertArray(type);
    }
    if (type === 2) {
      console.log("project", sendData[2]);
      invertArray(type);
    }
  };

  return (
    <Fragment>
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
          {props.type ? <h2>Edit</h2> : <h2>Upload</h2>}
          <p>
            <label htmlFor="title">Name</label>
            <input id="title" type="text" name="title" />
          </p>
          <p>
            <label htmlFor="gender">Gender</label>
            <select
              name="gender"
              class="form-select"
              aria-label="Default select example"
            >
              <option disabled selected value>
                -- select an option --
              </option>
              <option value="1">Male</option>
              <option value="2">Female</option>
              <option value="3">Unspecified</option>
            </select>
          </p>
          <p>
            <label htmlFor="department">Department</label>
            <input
              id="department"
              type="text"
              name="department"
              defaultValue=""
            />
          </p>
          <p>
            <label htmlFor="date">Date Of Joining</label>
            <input id="date" type="date" name="date" />
          </p>
          <p>
            <label htmlFor="previousDesignation">Previous Designation</label>
            <input
              id="name"
              type="text"
              name="previousDesignation"
              defaultValue=""
            />
          </p>
          <p>
            <label htmlFor="currentDesignation">Current Designation</label>
            <input
              id="name"
              type="text"
              name="currentDesignation"
              defaultValue=""
            />
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
            <select
              name="qualify"
              class="form-select"
              aria-label="Default select example"
            >
              <option selected>Choose...</option>
              <option value="1">B Tech - Civil</option>
              <option value="2">BE Civil</option>
              <option value="3">Diploma Civil</option>
            </select>
          </p>
          <p>
            <label htmlFor="year-of-course">Year of Completion</label>
            <input id="year-of-course" type="number" name="year-of-course" />
          </p>
          <div className="row">
            <div
              className={classes.adjust + " form-check form-switch col-lg-4"}
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
            <div className="col-lg-4">
              <label htmlFor="hra" style={{ display: "inline" }}>
                HRA:
              </label>
              <input
                name="hra"
                type="number"
                class="form-control"
                id="hra"
                placeholder="HRA 10%"
              />
            </div>
            <div className={"col-lg-3"}>
              <label htmlFor="da" style={{ display: "inline" }}>
                DA:
              </label>
              <input
                name="da"
                type="number"
                class="form-control"
                id="da"
                placeholder="DA 76%"
              />
            </div>
            <p>
              <label htmlFor="wef_date">WEF</label>
              <input id="wef" type="date" name="wef_date" />
            </p>
          </div>
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
            />
          </p>
          <p className="mt-2">
            <label htmlFor="remarks">Remarks</label>
            <textarea id="remarks" type="text" name="remarks" defaultValue="" />
          </p>
          <p>
            <label htmlFor="head">Head Engineer</label>
            <select
              class="form-select"
              name="head"
              aria-label="Default select example"
            >
              <option selected>Choose...</option>
              <option value="1">SHINTO PAUL</option>
              <option value="2">BK GOPAKUMAR</option>
            </select>
          </p>
          <p>
            <label htmlFor="director">Director</label>
            <select
              class="form-select"
              aria-label="Default select example"
              name="director"
            >
              <option selected>Choose...</option>
              <option value="1">SUREENDRAN MM</option>
              <option value="2">AJI KTK</option>
            </select>
          </p>
          <p className="mt-2">
            <label htmlFor="project">Project Name </label>
            <textarea id="project" type="text" name="project" defaultValue="" />
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
              {isSubmitting ? "Submitting..." : "Save"}
            </button>
          </div>
        </Card>
      </Form>
    </Fragment>
  );
};

export default Upload;
