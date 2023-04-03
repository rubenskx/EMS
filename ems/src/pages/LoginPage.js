import { useNavigate, useLocation, Link } from "react-router-dom";
import { useState } from "react";
import ButtonUI from "../UI/ButtonUI";
import useAuth from "../hooks/useAuth";
import classes from "./LoginPage.module.scss";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginPage = (props) => {
  const location = useLocation();
  const { setAuth } = useAuth();
  console.log(typeof setAuth);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [ptype, setPtype] = useState("password");
  const [pwicon, setPwicon] = useState(<FaEye />);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted {username}");
    setPassword("");
    setUsername("");
  };
  const handleToggle = () => {
    if (ptype === "password") {
      setPtype("text");
      setPwicon(<FaEyeSlash />);
    } else {
      setPtype("password");
      setPwicon(<FaEye />);
    }
  };
  const from = location.state?.from?.pathname || "/";
  const authenticateHandler = async (e) => {
    e.preventDefault();
    let object = {};
    object.username = username;
    object.password = password;
    const url = "http://localhost:7000/login";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(object),
    });

    if (response.status === 422) {
      setPassword("");
      setUsername("");
      return setError("The entered credentials is incorrect.");
    }
    if (!response.ok) {
      setPassword("");
      setUsername("");
      return setError("The database cannot be accessed now. Try again!");
    }
      const result = await response.json();
      setAuth({ user: "admin" });
      navigate(from, { replace: true });

  };

  return (
    <div className={classes.login}>
      <div className={classes.maincard}>
        <div className={classes.imagediv}></div>
        <div className={classes.formdiv1}>
          <form className={classes.formdiv} onSubmit={handleSubmit}>
            {error !== "" && (
              <p className="text-center" style={{ color: "red" }}>
                {error}
              </p>
            )}
            <h1 className={classes.logh}>Login</h1>
            <fieldset>
              <div className={classes.form__group + " " + classes.field}>
                <input
                  className={classes.form__field}
                  type="text"
                  autoComplete="off"
                  id="username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  placeholder="Username"
                  required
                />

                <label htmlFor="username" className={classes.form__label}>
                  Username
                </label>
              </div>
              <div className={classes.form__group + " " + classes.field}>
                <input
                  className={classes.form__field}
                  type={ptype}
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  placeholder="Password"
                  autoComplete="off"
                  required
                />
                <label htmlFor="password" className={classes.form__label}>
                  Password
                </label>
                <span onClick={handleToggle}>{pwicon}</span>
              </div>
              <div className={classes.container}>
                <Link to={"/login/forgotpassword"}>Forgot password?</Link>
              </div>
            </fieldset>
            <div className={classes.btn}>
              <button className={classes.button} onClick={authenticateHandler}>
                <span>Login</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
