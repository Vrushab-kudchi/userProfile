import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Style/Username.css';
import { Toaster, toast } from 'react-hot-toast';
import { useAuthStore } from '../store/store';
import { generateOTP, verifyOTP } from '../helper/helper';

export default function Recovery() {
  const username = useAuthStore((state) => state.auth.username);
  const [OTP, setOTP] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    generateOTP(username).then((OTP) => {
      if (OTP) {
        toast.success("OTP had been sent to Your Email");
      } else {
        toast.error('Problem While Generating OTP');
      }
    });
  }, [username]);
  async function onSubmit(e) {
    e.preventDefault();
    console.log("Entered OTP:", OTP); // Check entered OTP

    let { status } = await verifyOTP({ username, code: OTP });
    console.log(await verifyOTP({ username, code: OTP })); // Check verification status
    if (status === 201) {
      toast.success("Verified Successfully");
      return navigate('/reset');
    }
    return toast.error("Wrong OTP");
  }

  function resendOTP() {
    let sendPromise = generateOTP(username);
    toast.promise(sendPromise, {
      loading: <b>Sending</b>,
      success: <b>Check Your email</b>,
      error: <b>Could not Send OTP</b>
    });

    sendPromise.then(OTP => {
      console.log("Resent OTP:", OTP); // Check resent OTP
    });
  }

  return (
    <div className='flex h-screen justify-center items-center'>
      <Toaster position="top-center" reverseOrder={false}/>
      <div className="flex flex-col text-center">
        <div className='glass '>
          <h4 className='text-5xl font-bold p-4'> Recovery</h4>
          <span className='text-gray-500 w-2/3 text-xl p-4 text-center'>
            Enter OTP to recover your password
          </span>

          <form className='py-1 flex flex-col justify-center items-center' onSubmit={onSubmit}>
            <div className="flex flex-col justify-center items-center">
              <span className='mt-3 text-gray-500 text-sm'>
                Enter 6 digit OTP sent to your Email Address
              </span>
              <input
                type="text"
                className='textbox my-4'
                placeholder='OTP'
                name="OTP"
                onChange={(e) => setOTP(e.target.value)}
              />
              <button type='submit' className='btn'>Recover</button>
            </div>
          </form>
           <div className="text-center mt-5">
              <span className='text-gray-500 '>Can't get OTP? <button className='text-red-500' onClick={resendOTP}>Resend</button></span>
            </div>
        </div>
      </div>
    </div>
  );
}
