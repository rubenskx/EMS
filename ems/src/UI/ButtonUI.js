import classes from "./ButtonUI.module.css";
import { Fragment } from "react";
const ButtonUI = (props) => {
    return (
      <Fragment>
        <button className={classes["button-18"]} role="button" onClick={props.onClick}>
          {props.children}
        </button>
      </Fragment>
    );
}

export default ButtonUI;