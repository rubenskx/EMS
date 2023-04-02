import Card from "../UI/Card";
import { MdOutlineAttachMoney } from "react-icons/md";
const MedianSalary = (props) => {
  return (
    <>
      <Card>
        <p>The Median Salary of Employees </p>
        <h1>
          <MdOutlineAttachMoney /> {props.salary}
        </h1>
      </Card>
    </>
  );
};

export default MedianSalary;
