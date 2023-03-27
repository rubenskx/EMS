import { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./forgotpassword.module.scss";

function Forgotpassword() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/login/verifyotp");
    setUsername("");
  };
  return (
    <div className={classes.maincard1}>
      <div className={classes.title}>
        <h1 className={classes.logh1}>Forgot Password?</h1>
      </div>
      <div>
        <p className={classes.fpusername}>Please enter your username</p>
      </div>

      <form className={classes.form} onSubmit={handleSubmit}>
        <div className={classes.form__group1 + " " + classes.field1}>
          <input
            className={classes.form__field1}
            type="text"
            autoComplete="off"
            id="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            placeholder="Username"
            // pattern=""
            // title=""
            required
          />

          <label htmlFor="username" className={classes.form__label1}>
            Username
          </label>
          <div className={classes.btn1}>
            <button className={classes.button1}>
              <span>SUBMIT</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Forgotpassword;
