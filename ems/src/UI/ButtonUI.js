import classes from "./ButtonUI.module.css";
import { Fragment } from "react";
const ButtonUI = (props) => {
    return (
      <Fragment>
        <button type={props.type ? props.type: undefined} disabled={props.disabled? props.disabled: false} className={classes["button-18"]} role="button" onClick={props.onClick} style={{ backgroundColor: props.color}}>
          {props.children}
        </button>
      </Fragment>
    );
}

export default ButtonUI;