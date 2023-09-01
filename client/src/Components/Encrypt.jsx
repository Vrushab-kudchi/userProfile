import React, { useState } from 'react';
import '../Style/Username.css';
import { useFormik } from 'formik';
import { Toaster } from 'react-hot-toast';
import { excryptValidation } from '../helper/usernamevalidate';
import { encrypt, getUserName } from '../helper/helper';
import Navbar from './Navbar';

export default function Encrypt() {
  const [encryptedText, setEncryptedText] = useState('');
  const [showEncryptedText, setShowEncryptedText] = useState(false);
  const formik = useFormik({
    initialValues: {
      plainText: ''
      },
    validate: excryptValidation,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async values => {
      const { userId } = await getUserName()
      const { data: { encryptedText } } = await encrypt({ _id: userId, plainText: values.plainText })
      setShowEncryptedText(true);
      setEncryptedText(encryptedText);
      formik.resetForm();
    }
  });

  const copyToClipboard = () => {
    const textarea = document.createElement('textarea');
    textarea.value = encryptedText;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  };

  return (
    <>
  <Navbar />
    <div className='flex h-screen justify-center items-center'>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex flex-col text-center">
        <div className='glass'>
          <h4 className='text-5xl font-bold p-4'> Encrypt Here</h4>
          <span className='text-gray-500 w-2/3 text-xl p-4 text-center'>
            Enter The Message You Want To Encrypt
          </span>

          <form className='py-2 flex flex-col justify-center items-center' onSubmit={formik.handleSubmit}>

            <div className="flex flex-col justify-center items-center">
              <input
                type="text"
                className='textbox my-4'
                placeholder='Message'
                name="plainText"
                onChange={formik.handleChange}
                value={formik.values.plainText}
              />
              <button type='submit' className='btn'>Encrypt</button>
            </div>
          </form>
          {showEncryptedText && (
            <div className='mt-16'>
              <span className='text-gray-500 w-2/3 text-xl p-4 text-center font-bold'>
                Encrypted Text
              </span>
              <div className="relative">
                <input
                  type="textarea"
                  className="textarea my-7"
                  placeholder='Encrypted Text'
                  value={encryptedText}
                  readOnly
                />
                <button
                  className="btn"
                  onClick={copyToClipboard}
                >
                  Copy
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      </div>
      </>
  );
}
