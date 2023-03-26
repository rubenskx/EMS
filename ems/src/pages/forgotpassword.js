import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './forgotpassword.scss';

function Forgotpassword(){
    const [username,setUsername]=useState("");
    const navigate = useNavigate();
    const handleSubmit=(e)=>{
        e.preventDefault();
        navigate("/login/verifyotp");
        setUsername("");
    }
    return(
        <div className="maincard1">
            <div className="title">
                <h1 className="logh1">Forgot Password?</h1>
            </div>
            <div>
                <p className="fpusername">Please enter your username</p>
            </div>
            
                <form className="form" onSubmit={handleSubmit}>
            <div className="form__group1 field1">
                    <input 
                    className="form__field1" 
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
                    class="form__label1">
                        Username
                    </label>
                <div className="btn1">
                <button className="button1"><span>SUBMIT</span></button>
                </div>
                </div>
                </form>
            </div>
            
        
    );
}

export default Forgotpassword;