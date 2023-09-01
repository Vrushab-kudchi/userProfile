import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import profile from '../assets/profile.png'
import '../Style/Username.css';
import { useFormik } from 'formik';
import { fileToBase64 } from '../helper/filetobase64';
import { Toaster, toast } from 'react-hot-toast';
import { useAuthStore } from '../store/store';
import { useFetch } from '../hook/fetch.user';
import { updateUser } from '../helper/helper';
import Navbar from './Navbar';

export default function Profile() {
  const username = useAuthStore((state) => state.auth.username);
  const data = useFetch(username);
  const [file, setFile] = useState(null);

  const fileHandler = async (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      try {
        setFile(await fileToBase64(selectedFile));
      } catch (error) {
        console.log("error Converting to base64", error);
      }
    }
  }

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: data.apiData?.email || "",
      username: data.apiData?.username || "",
      secret_key: data.apiData?.secret_key || "",
    },
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async values => {
      values = await Object.assign(values, { profile: file ? file : data.apiData.profile })
      let updatePromise = updateUser(values);
      toast.promise(updatePromise, {
        loading: <b>Updating ...</b>,
        success: <b>Updated</b>,
        error: <b>Error While Updating</b>
      })
    }
  });

  const userLogOut = () => {
    localStorage.removeItem('token');
    navigate('/');
  }

  return (
    <>
      <Navbar />
    <div className='flex h-screen justify-center items-center'>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex flex-col text-center">
        <div className='glass'>
          <h4 className='text-5xl font-bold p-4'> Profile</h4>
          <span className='text-gray-500 w-2/3 text-xl p-4 text-center'>Edit Your Profile Here</span>

          <form className='py-2 flex flex-col justify-center items-center' onSubmit={formik.handleSubmit}>
            <label htmlFor="profile">
              <img
                src={file ? file : (data.apiData?.profile || profile)}
                className='profile_img my-4'
                alt="profile"
              />
            </label>
            <input type="file" id='profile' onChange={fileHandler} />
            <div className="flex gap-5">
              <input type="text" className='textbox my-2' placeholder='Email' name="email" onChange={formik.handleChange} value={formik.values.email} />
              <input type="text" className='textbox my-1' placeholder='Username' name="username" onChange={formik.handleChange} value={formik.values.username} />
            </div>
            <div className="flex gap-5">
              <input type="text" className='textbox my-1' placeholder='Secret-Key' name="secret_key" onChange={formik.handleChange} value={formik.values.secret_key} />
            </div>
            <div className="flex justify-center items-center w-[200px]">
              <button type='submit' className='btn mt-4 '>Update Now</button>
            </div>
            <div className="text-center mt-5">
        <span className='text-gray-500 '>Want to Log Out ? <Link onClick={userLogOut} className='text-red-500'>Logout</Link></span>
      </div>
          </form>
        </div>
      </div>
      </div>
      </>
  );
}
