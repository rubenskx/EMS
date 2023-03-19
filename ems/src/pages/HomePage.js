import EmployeesNumber from "../components/EmployeeNumber";
import MedianAge from "../components/MedianAge";
import RetiredEmployees from "../components/RetiredEmployees";
import CalendarComponent from "../components/Calendar";
import RecentEmployees from "../components/RecentEmployee";
import { useEffect, useState } from "react";

const HomePage = (props) => {
  const [time, setTime] = useState("undefined");
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "/Time/current/zone?timeZone=Asia/Calcutta", {headers:{
        "accepts":"application/json"
    }
  }
      );
      if(!response.ok){
        console.log(response);
      }
      else{
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
          {time && (time.hour >= 14 || time.hour <= 5) && (
            <h1>Good Evening, Admin!</h1>
          )}
          {time && (time.hour >= 6 && time.hour <= 10) && (
            <h1>Good Morning, Admin!</h1>
          )}
          <div className="col-sm-4">
            <EmployeesNumber />
          </div>
          <div className="col-sm-4">
            <MedianAge />
          </div>
          <div className="col-sm-4">
            <RetiredEmployees />
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-lg-8">
            <h3>Recently Viewed</h3>
            <RecentEmployees />
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
