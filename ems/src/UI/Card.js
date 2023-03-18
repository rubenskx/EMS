import classes from "./Card.module.css"
const EmployeesNumber = (props) => {
    return (
        <div className={classes.card}>
            {props.children}
        </div>
    );
}
export default EmployeesNumber;