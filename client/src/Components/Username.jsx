import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import profile from '../assets/profile.png';
import '../Style/Username.css';
import { useFormik } from 'formik';
import { usernameValidate } from '../helper/usernamevalidate';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from '../store/store';

export default function Username() {
  const setUsername = useAuthStore((state) => state.setUserName);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: ''
    },
    validate: usernameValidate,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async values => {
      setUsername(values.username);
      navigate('/password');
    }
  });

  return (
    <div className='flex h-screen justify-center items-center'>
      <Toaster position="top-center" reverseOrder={false}/>
      <div className="flex flex-col text-center">
        <div className='glass'>
          <h4 className='text-5xl font-bold p-4'> Welcome Again !</h4>
          <span className='text-gray-500 w-2/3 text-xl p-4 text-center'>
            Explore More By Connecting With Us.
          </span>

          <form className='py-2 flex flex-col justify-center items-center' onSubmit={formik.handleSubmit}>
            <img src={profile} className='profile_img my-4' alt="profile" />
            <div className="flex flex-col justify-center items-center">
              <input
                type="text"
                className='textbox my-4'
                placeholder='Username'
                name="username"
                onChange={formik.handleChange}
                value={formik.values.username}
              />
              <button type='submit' className='btn'>Let's Go</button>
            </div>
            <div className="text-center mt-5">
              <span className='text-gray-500 '>Not a Member? <Link to="/register" className='text-red-500'>Register Now</Link></span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
