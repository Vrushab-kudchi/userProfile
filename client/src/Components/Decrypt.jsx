import React, { useState } from 'react';
import '../Style/Username.css';
import { useFormik } from 'formik';
import { Toaster} from 'react-hot-toast';
import { decrypt } from '../helper/helper';
import Navbar from './Navbar';

export default function Decrypt() {
  const [decryptedText, setDecryptedText] = useState('');
  const [showDecryptedText, setShowDecryptedText] = useState(false);

  const formik = useFormik({
    initialValues: {
      encryptedText: '',
      secret_key: ''
    },
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async values => {
     const { data: { plainText }} = await decrypt({ encryptedText: values.encryptedText, secret_key: values.secret_key });
      setDecryptedText(plainText);
      setShowDecryptedText(true);
    }
  });

  return (
    <>
  <Navbar />
    <div className='flex h-screen justify-center items-center'>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex flex-col text-center">
        <div className='glass'>
          <h4 className='text-5xl font-bold p-4'> Decrypt Here</h4>
          <span className='text-gray-500 w-2/3 text-xl p-4 text-center'>
            Enter The Message You Want To Decrypt
          </span>

          <form className='py-2 flex flex-col justify-center items-center' onSubmit={formik.handleSubmit}>

            <div className="flex flex-col justify-center items-center">
              <input
                type="text"
                className='textbox my-4'
                placeholder='Secret Key'
                name="secret_key"
                onChange={formik.handleChange}
                value={formik.values.secret_key}
              />
              <input
                type="text"
                className='textbox my-4'
                placeholder='Encrypted Text'
                name="encryptedText"
                onChange={formik.handleChange}
                value={formik.values.encryptedText}
              />
              <button type='submit' className='btn'>Decrypt</button>
            </div>
          </form>
          {showDecryptedText && (
            <div className='mt-16'>
              <span className='text-gray-500 w-2/3 text-xl p-4 text-center font-bold'>
                Decrypted Text
              </span>
              <div className="relative">
                <input
                  type="textarea"
                  className="textarea my-7"
                  placeholder='Decrypted Text'
                  value={decryptedText}
                  readOnly
                />
              </div>
            </div>
          )}
        </div>
      </div>
      </div>
      </>
  );
}
