import EmployeesNumber from "../components/EmployeeNumber";
import MedianAge from "../components/MedianAge";
import RetiredEmployees from "../components/RetiredEmployees";
import CalendarComponent from "../components/Calendar";
import RecentEmployees from "../components/RecentEmployee";
const HomePage = (props) => {
    return (
      <>
        <div className="container">
          <div className="row mt-5">
            <h1>Good Afternoon, Admin!</h1>
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
            <div className="col-sm-8">
              <h3>Recently Viewed</h3>
              <RecentEmployees />
            </div>
            <div className="col-sm-4">
              <h3 style={{ textAlign: "center" }}>Calendar</h3>
              <CalendarComponent />
            </div>
          </div>
        </div>
      </>
    );
}
export default HomePage;