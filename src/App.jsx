import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import authService from "./appwrite/auth"
import { login, logout } from "./store/authSlice"
import Header from "./component/Header/Header1";
import Footer from "./component/Footer/Footer";

import { Outlet } from 'react-router-dom';

import './App.css'

function App() {
  const [loading, setloading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
  authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({ userData }));
      } else {
        dispatch(logout());
      }
    })
    .catch((err) => {
      console.error("getCurrentUser() Error:", err.message);
      dispatch(logout()); // Ensure we log out guest users on error
    })
    .finally(() => setloading(false));
}, []);
    
  return !loading ? (
    <div className='min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-gray-800 to-slate-900'>
      <Header />
      <main className='flex-1'>
        <Outlet />
      </main>
      <Footer />
    </div>
  ) : (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-gray-800 to-slate-900 flex items-center justify-center'>
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
        <p className="text-gray-300">Loading...</p>
      </div>
    </div>
  )
}

export default App
