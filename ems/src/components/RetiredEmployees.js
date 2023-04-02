import Card from "../UI/Card";
import { AiOutlineHome } from "react-icons/ai";
const RetiredEmployees = (props) => {
  return (
    <>
      <Card>
        <p>The Total Number of Retired Employees </p>
        <h1>
          <AiOutlineHome /> {props.retired}
        </h1>
      </Card>
    </>
  );
};

export default RetiredEmployees;
