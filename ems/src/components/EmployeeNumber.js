import Card from "../UI/Card"
import { SlPeople } from "react-icons/sl";
const EmployeesNumber = (props) => {
    return (
      <>
        <Card>
          <p>The Total Number of Employees </p>
          <h1>
            <SlPeople />
            {" "}
            1533
          </h1>
        </Card>
      </>
    );
};

export default EmployeesNumber;