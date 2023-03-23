import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import classes from "./Spinner.module.css"
function Spinner() {
  return (
    <div className={classes.spinner}>
      <ClipLoader color="#52bfd9" size={20} />
    </div>
  );
}

export default Spinner;
