import { Form, useNavigate, useNavigation, json } from "react-router-dom";
import Card from "../UI/Card";
import classes from "./SearchForm.module.css";
import { useState } from "react";

function SearchForm({ method, event }) {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const isSubmitting = navigation.state === "submitting";
  const [searchResults, setSearchResults] = useState("undefined");
  const [toggler, setToggler] = useState(0);
  const [displayCourse, setDisplayCourse] = useState(false);
  function cancelHandler() {
    navigate("..");
  }

  async function handleSubmit(event) {
    try {
      event.preventDefault();
      const data = new FormData(event.target);

      const eventData = {
        title: data.get("title"),
        image: data.get("image"),
        date: data.get("date"),
        description: data.get("description"),
      };

      console.log(eventData);
      let url = "http://localhost:7000/search";
      console.log(url);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      if (response.status === 422) {
        return response;
      }

      if (!response.ok) {
        throw json({ message: "Could not save event." }, { status: 500 });
      }
      const resultMessage = await response.json();
      console.log(resultMessage.message);
      setSearchResults(resultMessage.message);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {searchResults === "undefined" && (
        <Form className={classes.form} onSubmit={handleSubmit}>
          <Card>
            <h2>Search</h2>
            <p>
              <label htmlFor="title">Name (Keywords) </label>
              <input
                id="name"
                type="text"
                name="name"
                required
                defaultValue={event ? event.title : ""}
              />
            </p>
            <p>
              <label htmlFor="image">Gender</label>
              <select class="form-select" aria-label="Default select example">
                <option selected>Choose...</option>
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
                required
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
                  required
                  defaultValue={event ? event.date : ""}
                />
              </p>
              <p className="col-lg-4">
                Employees joined:
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                    style={{ width: "10%" }}
                  />
                  <label class="form-check-label" for="flexRadioDefault1">
                    Before this date
                  </label>
                  <input
                    class="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                    style={{ width: "10%" }}
                  />
                  <label class="form-check-label" for="flexRadioDefault1">
                    After this date
                  </label>
                  <input
                    class="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                    style={{ width: "10%" }}
                  />
                  <label class="form-check-label" for="flexRadioDefault1">
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
                required
                defaultValue=""
              />
            </p>
            <p>
              <label htmlFor="currentDesignation">Current Designation</label>
              <input
                id="name"
                type="text"
                name="currentDesignation"
                required
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
                      id="floatingPassword"
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
                      id="floatingPassword"
                      placeholder="Months.."
                    />
                  </>
                )}
              </div>
            </p>
            <p>
              <label htmlFor="image">Qualification</label>
              <select
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
            </div>
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
      {searchResults !== "undefined" && <p>{searchResults}</p>}
    </>
  );
}

export default SearchForm;
