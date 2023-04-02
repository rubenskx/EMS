import classes from "./Flash.module.css";
const Flash = (props) => {
function handleClick(event) {
  const element = event.target;
  if (element && element.parentElement) {
    element.parentElement.style.display = "none";
  }
}


return (
  <>
    <div
      className={classes.alert}
      style={{ backgroundColor: props.type === "warn" ? "#f44336" : "#04AA6D" }}
    >
      <span className={classes.closebtn} onClick={handleClick}>
        &times;
      </span>
      <div className="text-center">{props.children}</div>
    </div>
    ;
  </>
);
};

export default Flash;
