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
            {props.total}
          </h1>
        </Card>
      </>
    );
};

export default EmployeesNumber;