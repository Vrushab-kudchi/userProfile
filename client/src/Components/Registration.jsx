import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import profile from '../assets/profile.png'
import '../Style/Username.css';
import { useFormik } from 'formik';
import { registerValidation } from '../helper/usernamevalidate'
import { fileToBase64 } from '../helper/filetobase64';
import { Toaster, toast } from 'react-hot-toast';
import { register } from '../helper/helper';

export default function Registration() {
  const [file, setFile] = useState(null);

  const fileHandler = async (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile)
    {
      try
      {
        setFile( await fileToBase64(selectedFile));
      }
      catch(error)
      {
        console.log("error Converting to base64", error);
      }

    }

  }

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      password: '',
      secret_key: ''
    },
    validate: registerValidation,
    validateOnChange: false,
    validateOnBlur: false,
 onSubmit: async values => {
  values = await Object.assign(values, { profile: file || ' ' });

   try {
    const loading = toast.loading("Creating...");
    const response = await register(values);
    console.log(response)
    if (response.error)
    {
      toast.dismiss(loading);
     return toast.error(response.error.response.data.error);
    }
    else
    {
      toast.dismiss(loading);
      toast.success(response);
      setTimeout(() => {
        navigate('/');
      },2000)

    }

  } catch (error) {
    toast.error(<b>An error occurred. Could not complete registration.</b>);
  }
}


  })
  return (
    <div className='flex h-screen justify-center items-center'>
      <Toaster position="top-center" reverseOrder={false}/>
      <div className="flex flex-col text-center">
        <div className='glass'>
          <h4 className='text-5xl font-bold p-4'> Register</h4>
        <span className='text-gray-500 w-2/3 text-xl p-4 text-center'>Join Us Now !</span>

          <form className='py-2 flex flex-col justify-center items-center' onSubmit={formik.handleSubmit}>
          <label htmlFor="profile">
            <img src={file ? file : profile} className='profile_img my-4' alt="profile" />
            </label>
              <input type="file" id='profile' onChange={fileHandler} />
            <div className="flex flex-col justify-center items-center">
          <input type="text" className='textbox my-2' placeholder='Email' name="email" onChange={formik.handleChange} value={formik.values.email} />
              <input type="text" className='textbox my-1' placeholder='Username' name="username" onChange={formik.handleChange} value={formik.values.username} />
              <input type="password" className='textbox my-1' placeholder='Password' name="password" onChange={formik.handleChange} value={formik.values.password} />
              <input type="text" className='textbox my-1' placeholder='Secret-Key' name="secret_key" onChange={formik.handleChange} value={formik.values.secret_key} />
              <button type='submit' className='btn mt-4'>Register Now</button>
              </div>
        </form>
        </div>
      </div>
    </div>
  );
}
