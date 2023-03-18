import Card from "../UI/Card";
import { MdOutlineWorkOutline } from "react-icons/md";
const MedianAge = (props) => {
  return (
    <>
      <Card>
        <p>The Median Age of Employees </p>
        <h1>
          <MdOutlineWorkOutline /> 26
        </h1>
      </Card>
    </>
  );
};

export default MedianAge;
