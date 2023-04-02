import { useState } from "react";
import ButtonUI from "../UI/ButtonUI";
import Card from "../UI/Card";
import ExportExcel from "../utils/ExportExcel";
import Modal from "../UI/Modal";
import classes from "./Notifications.module.css";
import { json, useNavigate } from "react-router-dom";
import { HiTrash } from "react-icons/hi";

const Notifications = ({ notifs }) => {
  const [overlay, setOverlay] = useState(-1);
  const [errors, setErrors] = useState("");

  const navigate = useNavigate();
  const excelGenerator = (array) => {
    ExportExcel(array);
  };

  const OverlayHandler = (id) => {
    setOverlay(id);
  };

  const emailGenerator = async (array) => {
    const message = document.getElementById("message").value;
    let object = {};
    let idArray = [];
    array.map((ele) => idArray.push(ele.id));
    object.array = idArray;
    object.message = message;
    let url = "http://localhost:7000/inform";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(object),
    });

    setOverlay(-1);
    if (response.status === 422) {
      setErrors(response.message);
    }
    if (!response.ok) {
      setErrors("The database cannot be accessed now. Try again!");
      return errors;
    }
  };

  const startDeleteHandler = async (id) => {
    const proceed = window.confirm("Are you sure?");
    console.log("function", id);
    if (proceed) {
        const response = await fetch("http://localhost:7000/notifications/" + id, {
          method: "PUT",
        });

        if (!response.ok) {
          throw json(
            { message: "Could not delete event." },
            {
              status: 500,
            }
          );
        }
        return navigate("/notifications", { replace: true});
    }
  }
  return (
    <>
      <div className="container">
        {errors !== "" && <p style={{ color: "red" }}>{errors}</p>}
        {notifs.length === 0 && <p className="text-center mt-5">There are no notifications to show currently.</p>}
        {notifs.map((ele, id) => (
          <>
            <Card>
                {ele.title}
              <div style={{ textAlign: "right" }}>
                <HiTrash size={40} onClick={() => startDeleteHandler(ele.notification_id)}/>
                <ButtonUI onClick={() => setOverlay(id)}>
                  Inform Employees
                </ButtonUI>
                <ButtonUI onClick={() => excelGenerator(ele.data)} color="green">
                  Export as Excel
                </ButtonUI>
              </div>
            </Card>
            {overlay === id && (
              <Modal overlayClose={OverlayHandler}>
                <div>
                  <h2>Send a custom message: </h2>
                </div>
                <p>Add your text here:</p>
                <textarea
                  id="message"
                  type="text"
                  name="message"
                  rows={"5"}
                  defaultValue=""
                  style={{ width: "100%" }}
                />
                <div className={classes.actions}>
                  <ButtonUI color="brown" onClick={() => setOverlay(-1)}>
                    Close
                  </ButtonUI>
                  <ButtonUI onClick={() => emailGenerator(ele)} color="green">
                    Send
                  </ButtonUI>
                </div>
              </Modal>
            )}
          </>
        ))}
      </div>
    </>
  );
};
export default Notifications;
