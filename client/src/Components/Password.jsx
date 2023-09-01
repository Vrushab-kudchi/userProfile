import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import profile from '../assets/profile.png';
import '../Style/Username.css';
import { useFormik } from 'formik';
import { passwordValidation } from '../helper/usernamevalidate';
import { Toaster, toast } from 'react-hot-toast';
import { useAuthStore } from '../store/store';
import { useFetch } from '../hook/fetch.user';
import { login } from '../helper/helper';

export default function Password() {
  const username = useAuthStore((state) => state.auth.username);
  const navigate = useNavigate();
  const data = useFetch(username);
  const formik = useFormik({
    initialValues: {
      password: ''
    },
    validate: passwordValidation,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
  let loginPromise = login({ username, password: values.password });

  try {
    const res = await loginPromise;
    if (res.token) {
      localStorage.setItem('token', res.token);
      navigate('/encrypt');
    } else {
      toast.error("Invalid Password");
    }
  } catch (error) {
    toast.error("An error occurred while logging in.");
  }
}
  });
  if (data.isLoading) return <h1>Loading</h1>;
  if (data.serverError) return <h1>{data.serverError.message}</h1>;
  return (
    <div className='flex h-screen justify-center items-center'>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex flex-col text-center">
        <div className='glass'>
          <h4 className='text-5xl font-bold p-4'> Welcome {data.apiData?.username}</h4>
          <span className='text-gray-500 w-2/3 text-xl p-4 text-center'>Explore More By Connecting With Us.</span>
          <form className='py-2 flex flex-col justify-center items-center' onSubmit={formik.handleSubmit}>
            <img src={data.apiData?.profile || profile} className='profile_img my-4' alt="profile" />
            <div className="flex flex-col justify-center items-center">
              <input type="password" className='textbox my-4' placeholder='password' name="password" onChange={formik.handleChange} value={formik.values.password} />
              <button type='submit' className='btn'>Sign in</button>
            </div>
            <div className="text-center mt-5">
              <span className='text-gray-500 '>forgot password ? <Link to="/recovery" className='text-red-500'>Recover Now</Link></span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
