import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import ButtonUI from "../UI/ButtonUI";
import useAuth from "../hooks/useAuth";
import './LoginPage.scss';
import {FaEye,FaEyeSlash} from "react-icons/fa";

const LoginPage = (props) => {
    const location = useLocation();
    const { setAuth } = useAuth();
    console.log( typeof setAuth);
    const navigate = useNavigate();
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const [ptype,setPtype]=useState("password");
    const [pwicon,setPwicon]=useState(<FaEye/>);
    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log("submitted {username}");
        setPassword("");
        setUsername("");
        
    }
    const handleToggle=()=>{
        if(ptype==="password"){
            setPtype("text");
            setPwicon(<FaEyeSlash/>);
        }
        else{
            setPtype("password");
            setPwicon(<FaEye/>);
        }
    }
    const from = location.state?.from?.pathname || "/";
    const authenticateHandler = (e) => {
        e.preventDefault();
        setAuth({ user : "Ruben" });
        navigate(from, { replace: true });
    }
        return (
            <div className="maincard">
            <div className="imagediv">
                
            </div>
            <div className="formdiv1">
            <form className="formdiv" onSubmit={handleSubmit} >
                <h1 className="logh">Login</h1>
                <fieldset>
                <div className="form__group field">
                    <input 
                    className="form__field" 
                    type="text" 
                    autoComplete="off"
                    id="username" value={username} 
                    onChange={e=>{setUsername(e.target.value)}} 
                    placeholder="Username"
                    // pattern=""
                    // title=""
                    required/>

                    <label 
                    htmlFor="username" 
                    class="form__label">
                        Username
                    </label>
                </div>
                <div className="form__group field">
                    <input 
                    className="form__field"  
                    type={ptype}
                    id="password" 
                    value={password} 
                    onChange={e=>{setPassword(e.target.value)}} 
                    placeholder="Password"
                    autoComplete="off"
                    required/>
                    <label 
                    htmlFor="password" 
                    class="form__label">
                        Password
                    </label>
                    <span onClick={handleToggle}>{pwicon}</span>
                </div>
                <div className="container">
                    <a href="/login/forgotpassword">Forgot password?</a>
                </div>
                </fieldset>
                <div className="btn">
                <button className="button" onClick={authenticateHandler}><span>Login</span></button>
                </div>
                </form>
            </div>
        </div>
        );
    };

export default LoginPage