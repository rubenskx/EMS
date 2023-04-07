import EmployeesNumber from "./EmployeeNumber";
import MedianSalary from "./MedianSalary";
import RetiredEmployees from "./RetiredEmployees";
import CalendarComponent from "./Calendar";
import RecentEmployees from "./RecentEmployee";
import Spinner from "../UI/Spinner";
import { useEffect, useState } from "react";

const HomePage = ({ results }) => {
  const [time, setTime] = useState("undefined");
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "/Time/current/zone?timeZone=Asia/Calcutta",
        {
          headers: {
            accepts: "application/json",
          },
        }
      );
      if (!response.ok) {
        console.log(response);
      } else {
        const timeAPI = await response.json();
        setTime(timeAPI);
        console.log(timeAPI);
      }
    }
    fetchData();
  }, []);
  return (
    <>
      <div className="container">
        <div className="row mt-5">
          {time && time.hour >= 11 && time.hour <= 14 && (
            <h1>Good Afternoon, Admin!</h1>
          )}
          {time && (time.hour > 14 || time.hour <= 5) && (
            <h1>Good Evening, Admin!</h1>
          )}
          {time && time.hour >= 6 && time.hour <= 10 && (
            <h1>Good Morning, Admin!</h1>
          )}
          {time === "undefined" && <Spinner />}
          <div className="col-sm-4">
            <EmployeesNumber total={results.total[0].count} />
          </div>
          <div className="col-sm-4">
            <MedianSalary salary={results.avg_salary[0].count} />
          </div>
          <div className="col-sm-4">
            <RetiredEmployees retired={results.hra[0]} />
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-lg-8">
            <h3>Recently Viewed</h3>
            <RecentEmployees employees={results.new_emp} />
          </div>
          <div className="col-lg-4">
            <h3>Calendar</h3>
            <CalendarComponent />
          </div>
        </div>
      </div>
    </>
  );
};
export default HomePage;
