
import './otp.scss';
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
        <div className="maincard2">
            <div className="title2">
                <h1 className="logh2">Verify OTP</h1>
            </div>
            <div>
                <p className="fpusername">An OTP has been sent to your mail id. 
                Please enter the OTP in the space provided and click Verify.</p>
                <p className="note1">Note: Do not refresh the page !</p>
            </div>
            <div className='otpinput'>
            <OtpInput
      value={otp}
      onChange={setOtp}
      numInputs={6}
      renderSeparator={<span>-</span>}
      renderInput={(props) => <input {...props} />}
    />
    </div>
    <button className='button2' onClick={handleClick}><span>Verify</span></button>
        </div>
            
        
    );
}


export default Otp;