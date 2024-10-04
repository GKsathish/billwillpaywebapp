import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Notification from '../Notification/Notification';

const Login = (props) => {
    const [note, setnote] = useState();
    const [mnumber, setMNumber] = useState();
    const [otppage, setOtpPage] = useState(false);
    const [number, setNumber] = useState('');
    const [otp, setOtp] = useState('');


    const handleloginmobilenumber = () => {
        if (number.length == 10) {
            fetchdata(number);
        }
    }
    const handleloginotp = () => {
        if (otp.length == 4) {
            fetchotpdata(otp);
        }
    }

    const fetchdata = async (value) => {
        const apidata = {
            "mobile": value
        }
        const api = await fetch('https://dev.billwill.in/api/otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(apidata)
        })
        const res = await api.json();
        if (res.status == 'SUCCESS') {
            setnote(<Notification status="Success" message="OTP Sent Successfully" showstatus={setnote} />);
            setMNumber(res.mobile);
            setOtpPage(true);
        }
    }

    const fetchotpdata = async (otp) => {
        const apidata = {
            "mobile": mnumber,
            "otp": otp
        }
        const api = await fetch('https://dev.billwill.in/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(apidata)
        })
        const res = await api.json();
        if (res.status == 'SUCCESS') {
            window.sessionStorage.setItem("number", res.mobile);
            window.sessionStorage.setItem("key", res.token);
            window.sessionStorage.setItem("success", 'Login Successfully')
            window.location.reload()
        } else {
            setnote(<Notification status="Danger" message="Wrong Entry" showstatus={setnote} />);
        }
    }

    return (
        <>
            {note}
            <div className="main">
                <div className="container ">
                    <div className="row pb-5">
                        {
                            otppage == false ? (< div className="col-md-6 offset-md-3" >
                                <div className="my-form w-100 m-1 p-5">
                                    <h6 className="mb-4 text-center">Verify</h6>
                                    <div className="form-group  mt-3 mb-3">
                                        <label>Mobile Number</label>
                                        <input className="form-control" type="tel" onInput={e => setNumber(e.target.value)} value={number} maxLength={10} />
                                    </div>
                                    <div className='text-center'>
                                        <Button variant="success" className="text-center my-button" onClick={() => handleloginmobilenumber()}>Generate OTP</Button>
                                    </div>
                                </div>
                            </div >) : (
                                <div className="col-md-6 offset-md-3">
                                    <div className="my-form w-100 m-1 p-5">
                                        <h6 className="mb-4">One-Time Password</h6>
                                        <div className="form-group  mt-3 mb-3">
                                            <label>OTP</label>
                                            <input className="form-control" type="password" onInput={e => setOtp(e.target.value)} value={otp} maxLength={4} />
                                        </div>
                                        <div className='text-center'>
                                            <Button variant="success" className="text-center" onClick={() => handleloginotp()}>Submit</Button>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div >
            </div >
        </>

    );
}

export default Login;