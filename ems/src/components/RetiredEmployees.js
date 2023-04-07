import Card from "../UI/Card";
import { TbMathSymbols } from "react-icons/tb";
const RetiredEmployees = (props) => {
  console.log(props, "retired");
  return (
    <>
      <Card>
        <p>The HRA and DA percentage currently </p>
        <h1>
          <TbMathSymbols /> {props.retired.HRA}% & {props.retired.DA}%
        </h1>
      </Card>
    </>
  );
};

export default RetiredEmployees;
