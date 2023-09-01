import React, { useState, useEffect } from 'react';
import logo from '../assets/logo2.png';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/store';
import { useFetch } from '../hook/fetch.user';
import profile from '../assets/profile.png';

function Navbar() {
  const username = useAuthStore((state) => state.auth.username);
  const data  = useFetch(username);
  const [image, setImage] = useState(profile);
  useEffect(() => {
    if (data) {
      setImage(data.apiData?.profile || profile);
    }
  }, [data]);

  return (
    <div>
      <nav class="flex items-center justify-between flex-wrap bg-slate-400 p-6 ">
        <div class="flex items-center flex-shrink-0 text-white mr-6">
          <img src={logo} alt="logo" className='h-14'/>
          <span class="font-semibold text-xl tracking-tight tracking-wide">Secure Crypt</span>
        </div>
        <div class="block lg:hidden">
          {/* Toggle button code */}
        </div>
        <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div class="text-sm lg:flex-grow">
            <Link to="/encrypt" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
              Encrypt
            </Link>
            <Link to="/decrypt" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
              Decrypt
            </Link>
            <Link to="/user/history" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white">
              History
            </Link>
          </div>
          <div>
            <Link to='/profile'>
              <img src={image} className="h-14 w-14 rounded-full mx-auto object-cover" alt="Avatar" />
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default React.memo(Navbar);
