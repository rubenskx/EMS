import Card from "../UI/Card";
import classes from "./SearchForm.module.css";
import {
  Form,
  useNavigate,
  useNavigation,
  useActionData,
} from "react-router-dom";
import { Fragment, useState } from "react";
import { AiOutlinePlus, AiOutlineMinus, AiOutlineSend } from "react-icons/ai";
import TextArea from "../UI/TextArea";
import Flash from "../UI/Flash";
import CommonForm from "./CommonForm";

const Upload = (props) => {
  const { formdata } = props;
  console.log("formData", formdata);
  const [text, setText] = useState([true, true, true]);
  const [flashMessage, setFlashMessage] = useState("");
  const [sendData, setSendData] = useState(["", "", ""]);

  const data = useActionData();

  const invertArray = (id) => {
    let array = [...text];
    array[id] = !array[id];
    setText(array);
  };

  function handleTextAreaChange(value, type) {
    let array = [...sendData];
    array[type] = value;
    setSendData(array);
  }

  const submitFields = async (type) => {
    setFlashMessage("");
    let object = {};
    let url = "http://localhost:7000/";
    if (type === 0) {
      console.log("dept", sendData[0]);
      object.name = sendData[0];
      url = url + "add/dept";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(object),
      });

      if (!response.ok) {
      }
      setFlashMessage("The department was successfully added.");
      invertArray(type);
    }
    if (type === 1) {
      console.log("design", sendData[1]);
      url = url + "add/designation";
      object.name = sendData[1];
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(object),
      });

      if (!response.ok) {
        console.log("error");
      }
      setFlashMessage("The designation was successfully added.");
      invertArray(type);
    }
    if (type === 2) {
      console.log("project", sendData[2]);
      url = url + "add/project";
      object.name = sendData[2];
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(object),
      });

      if (!response.ok) {
        console.log("error");
      }
      setFlashMessage("The project was successfully added.");
      invertArray(type);
    }
  };

  return (
    <Fragment>
      {flashMessage !== "" && <Flash>{flashMessage}</Flash>}
      {data && data.message && <p style={{ color: "red" }}>{data.message}</p>}
      <CommonForm method={"POST"} formdata={formdata}>
        <Card>
          <div className="mb-4">
            <span className={classes.left}>Add Department</span>
            <span className={classes.right}>
              {!text[0] && (
                <AiOutlineSend size={30} onClick={() => submitFields(0)} />
              )}
              {text[0] && (
                <AiOutlinePlus size={30} onClick={() => invertArray(0)} />
              )}
              {!text[0] && (
                <AiOutlineMinus size={30} onClick={() => invertArray(0)} />
              )}
            </span>
          </div>
          {!text[0] && (
            <TextArea onTextChange={handleTextAreaChange} type={0} />
          )}
        </Card>
        <Card>
          <div className="mb-4">
            <span className={classes.left}>Add Designation</span>
            <span className={classes.right}>
              {!text[1] && (
                <AiOutlineSend size={30} onClick={() => submitFields(1)} />
              )}
              {text[1] && (
                <AiOutlinePlus size={30} onClick={() => invertArray(1)} />
              )}
              {!text[1] && (
                <AiOutlineMinus size={30} onClick={() => invertArray(1)} />
              )}
            </span>
          </div>
          {!text[1] && (
            <TextArea onTextChange={handleTextAreaChange} type={1} />
          )}
        </Card>
        <Card>
          <div className="mb-4">
            <span className={classes.left}>Add Project Name</span>
            <span className={classes.right}>
              {!text[2] && (
                <AiOutlineSend size={30} onClick={() => submitFields(2)} />
              )}
              {text[2] && (
                <AiOutlinePlus size={30} onClick={() => invertArray(2)} />
              )}
              {!text[2] && (
                <AiOutlineMinus size={30} onClick={() => invertArray(2)} />
              )}
            </span>
          </div>
          {!text[2] && (
            <TextArea onTextChange={handleTextAreaChange} type={2} />
          )}
        </Card>
      </CommonForm>
    </Fragment>
  );
};

export default Upload;
