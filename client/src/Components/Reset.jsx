import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Style/Username.css';
import { useFormik } from 'formik';
import { resetValidation } from '../helper/usernamevalidate'
import { Toaster, toast } from 'react-hot-toast';
import { resetPassword } from '../helper/helper';
import { useAuthStore } from '../store/store';

export default function Reset() {
  const username = useAuthStore((state) => state.auth.username);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      password: '',
      confirm_password: ''
    },
    validate:resetValidation,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async values => {
      let resetPromise = resetPassword({ username, password: values.password })
      toast.promise(resetPromise, {
        loading: <b>Updating ..</b>,
        success: <b>password Updated</b>,
        error: <b>Updating failed</b>
      })
      resetPromise.then(() => navigate('/'));
    }
  })
  return (
    <div className='flex h-screen justify-center items-center'>
      <Toaster position="top-center" reverseOrder={false}/>
      <div className="flex flex-col text-center">
        <div className='glass'>
          <h4 className='text-5xl font-bold p-4'> Reset </h4>
        <span className='text-gray-500 w-2/3 text-xl p-4 text-center'>Enter Your New Password</span>

      <form className='py-2 flex flex-col justify-center items-center' onSubmit={formik.handleSubmit}>

          <div className="flex flex-col justify-center items-center">
              <input type="password" className='textbox my-4' placeholder='password' name="password" onChange={formik.handleChange} value={formik.values.password} />
              <input type="password" className='textbox my-4' placeholder='confirm password' name="confirm_password" onChange={formik.handleChange} value={formik.values.confirm_password} />
              <button type='submit' className='btn'>Reset</button>
              </div>

        </form>
        </div>
      </div>
    </div>
  );
}
