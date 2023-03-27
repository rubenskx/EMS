
import classes from './otp.module.scss';
import React, { useState } from 'react';
import OtpInput from 'react-otp-input';

function Otp(){
    const [otp, setOtp] = useState('');
    const handleSubmit=(e)=>{
        e.preventDefault();
    }
    const handleClick=(e)=>{
            
    }

    return(
        <div className={classes.maincard2}>
            <div className={classes.title2}>
                <h1 className={classes.logh2}>Verify OTP</h1>
            </div>
            <div>
                <p className={classes.fpusername}>An OTP has been sent to your mail id. 
                Please enter the OTP in the space provided and click Verify.</p>
                <p className={classes.note1}>Note: Do not refresh the page !</p>
            </div>
            <div className={classes.otpinput}>
            <OtpInput
      value={otp}
      onChange={setOtp}
      numInputs={6}
      renderSeparator={<span>-</span>}
      renderInput={(props) => <input {...props} />}
    />
    </div>
    <button className={classes.button2} onClick={handleClick}><span>Verify</span></button>
        </div>
            
        
    );
}


export default Otp;