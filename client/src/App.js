import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Username from './Components/Username';
import Password from './Components/Password.jsx';
import Registration from './Components/Registration.jsx';
import Profile from './Components/Profile.jsx';
import Recovery from './Components/Recovery.jsx';
import Reset from './Components/Reset.jsx';
import Encrypt from './Components/Encrypt.jsx'
import Decrypt from './Components/Decrypt.jsx'
import PageNotFound from './Components/PageNotFound.jsx';
import UserHistory from './Components/UserHistory';
import Home from './Components/Home'

//MIDDLEWARE
import { AuthorizeUser, ProtectRoute } from './middleware/auth'


function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/login',
      element: <Username />
    },
    {
      path: '/password',
      element:<ProtectRoute><Password /></ProtectRoute>
    },
    {
      path: '/register',
      element:<Registration />
    },
    {
      path: '/profile',
      element:<AuthorizeUser><Profile /></AuthorizeUser>
    },
    {
      path: '/recovery',
      element:<Recovery />
    },
    {
      path: '/reset',
      element:<Reset />
    },
    {
      path: '/encrypt',
      element:<AuthorizeUser><Encrypt /></AuthorizeUser>
    },
    {
      path: '/decrypt',
      element:<AuthorizeUser><Decrypt /></AuthorizeUser>
    },
    {
      path: '/user/history',
      element: <AuthorizeUser><UserHistory /></AuthorizeUser>
    },
    {
      path: '/*',
      element:<PageNotFound />
    },
  ])
  return (
    <main>
      <RouterProvider router={router}></RouterProvider>

    </main>
  );
}

export default App;
