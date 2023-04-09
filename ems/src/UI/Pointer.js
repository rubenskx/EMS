import classes from "./Pointer.module.css";
const Pointer = (props) => {
    return (
        <div className={classes.pointer}>
                {props.children}
        </div>
    )
}

export default Pointer;