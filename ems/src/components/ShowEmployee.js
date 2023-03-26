import Card from "../UI/Card";
import { AiOutlineEdit  } from "react-icons/ai";
import classes from "./ShowEmployee.module.css";
import { useNavigate } from "react-router-dom";

const ShowEmployee = () => {

    const navigate = useNavigate();

    const editPageGenerator = (id) => {
        navigate(`/search-form/${id}/edit`);
    }
    return (
      <>
        <div className="container">
          <Card>
            <div className="row">
              <div style={{ textAlign: "left" }} className="col-lg-11">
                <h2>Ruben Sinu Kurian</h2>
                <p>Web Developer</p>
              </div>
              <div style={{ textAlign: "right" }} className="col-lg-1">
                <AiOutlineEdit size={30} onClick={() => editPageGenerator(0)}/>
              </div>
            </div>
            <div className="row container">
              <div className="col-lg-4">
                <div>
                  <label htmlFor="name" className={classes.bold + " mt-3"}>
                    Name
                  </label>
                  <div>Ruben Sinu Kurian</div>
                </div>
                <div>
                  <label htmlFor="name" className={classes.bold + " mt-3"}>
                    Email
                  </label>
                  <div>rubensinuk@gmail.com</div>
                </div>
                <div>
                  <label htmlFor="number" className={classes.bold + " mt-3"}>
                    Mobile Number
                  </label>
                  <div>+91 8943141386</div>
                </div>
                <div>
                  <label htmlFor="number" className={classes.bold + " mt-3"}>
                    Department
                  </label>
                  <div>Technology</div>
                </div>
                <div>
                  <label htmlFor="number" className={classes.bold + " mt-3"}>
                    Retired
                  </label>
                  <div>No</div>
                </div>
                <div>
                  <label
                    htmlFor="head_engineer"
                    className={classes.bold + " mt-3"}
                  >
                    Head Enginner
                  </label>
                  <div>Mr. Xyz</div>
                </div>
              </div>
              <div className="col-lg-4">
                <div>
                  <label htmlFor="gender" className={classes.bold + " mt-3"}>
                    Gender
                  </label>
                  <div>Male</div>
                </div>
                <div>
                  <label htmlFor="date" className={classes.bold + " mt-3"}>
                    Date Of Joining
                  </label>
                  <div>12/2/2022</div>
                </div>
                <div>
                  <label
                    htmlFor="designation"
                    className={classes.bold + " mt-3"}
                  >
                    Current Designation
                  </label>
                  <div>Web Developer (Engineer) </div>
                </div>
                <div>
                  <label htmlFor="salary" className={classes.bold + " mt-3"}>
                    Current Salary
                  </label>
                  <div>25000</div>
                </div>
                <div>
                  <label htmlFor="number" className={classes.bold + " mt-3"}>
                    WEF Date
                  </label>
                  <div>1/5/2022</div>
                </div>
                <div>
                  <label htmlFor="director" className={classes.bold + " mt-3"}>
                    Director
                  </label>
                  <div>Mr. Abcdefg</div>
                </div>
              </div>
              <div className="col-lg-4" style={{ paddingLeft: "50px" }}>
                <div>
                  <label
                    htmlFor="old_salary"
                    className={classes.bold + " mt-3"}
                  >
                    Old Salary
                  </label>
                  <div>20000</div>
                </div>
                <div>
                  <label htmlFor="da" className={classes.bold + " mt-3"}>
                    DA 76%
                  </label>
                  <div>1024</div>
                </div>
                <div>
                  <label htmlFor="hra" className={classes.bold + " mt-3"}>
                    HRA 10%
                  </label>
                  <div>2500</div>
                </div>
                <div>
                  <label htmlFor="salary" className={classes.bold + " mt-3"}>
                    Remarks
                  </label>
                  <p>Currently on a holiday. Will resume work on 4/4/2023.</p>
                </div>
                <div>
                  <label htmlFor="deduction" className={classes.bold}>
                    % Of Deduction
                  </label>
                  <div>10</div>
                </div>
                <div>
                  <label htmlFor="project" className={classes.bold}>
                    Project
                  </label>
                  <div>Nit Calicut Works</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </>
    );
};

export default ShowEmployee;