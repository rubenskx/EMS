import classes from "./Flash.module.css";
const Flash = (props) => {
  console.log(props);
const handleClick = () => {
    props.handleFlashClick();
}


return (
  <>
    <div
      className={classes.alert}
      style={{ backgroundColor: props.type === "warn" ? "#f44336" : "#04AA6D" }}
    >
      <span className={classes.closebtn} onClick={props.handleFlashClick}>
        &times;
      </span>
      <div className="text-center">{props.children}</div>
    </div>
    ;
  </>
);
};

export default Flash;
