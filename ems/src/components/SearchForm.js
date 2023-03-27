import {
  Form,
  useNavigate,
  useNavigation,
  useActionData,
} from "react-router-dom";
import Card from "../UI/Card";
import classes from "./SearchForm.module.css";
import { useState } from "react";
import RecentEmployees from "./RecentEmployee";
import ButtonUI from "../UI/ButtonUI";
import Select from "react-select";
import options from "../utils/fieldOptions";
import ExportExcel from "../utils/ExportExcel";




function SearchForm({ method, event }) {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const isSubmitting = navigation.state === "submitting";
  const data = useActionData();
  const [toggler, setToggler] = useState(0);
  const [displayCourse, setDisplayCourse] = useState(false);
  const [filterOptions, setFilterOptions] = useState([options[1]]);
  function cancelHandler() {
    navigate("..");
  }
  
  const excelGenerator = () => {
    if(data && data.result){
    const { employees }=  data.result;
    console.log(filterOptions);
    console.log(employees);
    const filteredArray = employees.map((obj) =>
      Object.keys(obj)
        .filter((key) => filterOptions.includes(key))
        .reduce((acc, key) => ({ ...acc, [key]: obj[key] }), {})
    );
        console.log(filteredArray);
        ExportExcel(filteredArray);
        
    }else{
      return;
    }
  }


  const handleChange = (selectedOptions) => {
    let array = [];
    selectedOptions.map((ele) => array.push(ele.value));
    setFilterOptions(array);
  };


  return (
    <>
      {data && data.result && (
        <>
          <div className="container mt-3">
            <div>
              <h1 className={classes.header}>Search Results</h1>
              <p>Filter the results.</p>
              <Select
                defaultValue={[options[1]]}
                isMulti
                name="colors"
                options={options}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={handleChange}
              />
              <div style={{ textAlign: "right" }} className="mt-2">
                <ButtonUI onClick={excelGenerator}>Export as Excel</ButtonUI>
              </div>
            </div>
            <RecentEmployees employees={data.result.employees} />
          </div>
        </>
      )}
      {(!data || !data.result) && (
        <Form className={classes.form} method={"POST"}>
          <Card>
            <h2>Search</h2>
            <p>
              <label htmlFor="title">Name (Keywords) </label>
              <input
                id="title"
                type="text"
                name="title"
                defaultValue={event ? event.title : ""}
              />
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
            <div className="row">
              <p className="col-lg-8">
                <label htmlFor="date">Date Of Joining</label>
                <input
                  id="date"
                  type="date"
                  name="date"
                  defaultValue={event ? event.date : ""}
                />
              </p>
              <p className="col-lg-4">
                Employees joined:
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="btd"
                    id="btd"
                    style={{ width: "10%" }}
                  />
                  <label class="form-check-label" for="btd">
                    Before this date
                  </label>
                  <input
                    class="form-check-input"
                    type="radio"
                    name="atd"
                    id="atd"
                    style={{ width: "10%" }}
                  />
                  <label class="form-check-label" for="atd">
                    After this date
                  </label>
                  <input
                    class="form-check-input"
                    type="radio"
                    name="otd"
                    id="otd"
                    style={{ width: "10%" }}
                  />
                  <label class="form-check-label" for="otd">
                    On this date
                  </label>
                </div>
              </p>
            </div>
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
                  onClick={() =>
                    toggler !== 1 ? setToggler(1) : setToggler(0)
                  }
                >
                  Months
                </div>
                <div
                  className={
                    (toggler === 2 ? classes.toggler : " ") + " col-lg-6"
                  }
                  onClick={() =>
                    toggler !== 2 ? setToggler(2) : setToggler(0)
                  }
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
                onClick={() => setDisplayCourse(true)}
              >
                <option selected>Choose...</option>
                <option value="1">B Tech - Civil</option>
                <option value="2">BE Civil</option>
                <option value="3">Diploma Civil</option>
              </select>
            </p>
            {displayCourse && (
              <p>
                <label htmlFor="year-of-course">Year of Completion</label>
                <input
                  id="year-of-course"
                  type="number"
                  name="year-of-course"
                />
              </p>
            )}
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
            <div className="row">
              {data && data.salary && (
                <p className={classes.warn}>{data.salary}</p>
              )}
              <div className={"col-lg-6"}>
                <label htmlFor="salary_less" style={{ display: "inline" }}>
                  Salary Less Than:
                </label>
                <input
                  name="salary_less"
                  type="number"
                  class="form-control"
                  id="salary_less"
                  placeholder="Enter..."
                  min="1"
                />
              </div>
              <div className={"col-lg-6"}>
                <label htmlFor="salary_greater" style={{ display: "inline" }}>
                  Salary Greater Than:
                </label>
                <input
                  name="salary_greater"
                  type="number"
                  class="form-control"
                  id="salary_greater"
                  placeholder="Enter..."
                  min="1"
                />
              </div>
            </div>
            <p className="mt-2">
              <label htmlFor="remarks">Remarks (Keywords) </label>
              <textarea
                id="remarks"
                type="text"
                name="remarks"
                defaultValue=""
              />
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
              <label htmlFor="project">Project Name (Keywords) </label>
              <textarea
                id="project"
                type="text"
                name="project"
                defaultValue=""
              />
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
      )}
    </>
  );
}

export default SearchForm;

export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();
  var object = {};
  data.forEach((value, key) => (object[key] = value));
  console.log(object);
  // console.log(object.title);
  let errors = {};
  if (
    object.salary_greater.length > 0 &&
    object.salary_less.length > 0 &&
    object.salary_greater < object.salary_less
  ) {
    errors.salary = "The range for salary provided is incorrect.";
  }

  if (Object.keys(errors).length > 0) {
    return errors;
  }
  let url = "http://localhost:7000/search-form";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(object),
  });

  if(response.status === 422){
    errors.top= response.message;
  }
  if(!response.ok){
    errors.top = "The database cannot be accessed now. Try again!";
    return errors;
  }

  const result = await response.json();
  console.log(result);
  errors.result = result;
  return errors;
}