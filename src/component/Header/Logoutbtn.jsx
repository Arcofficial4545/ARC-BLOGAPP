import React from 'react'
import { useDispatch } from 'react-redux'
import authService from "../../appwrite/auth"
import { logout } from '../../store/authSlice'

const Logoutbtn = () => {
  const dispatch = useDispatch()
  const logouthandler = () => {
    authService.logout().then(() => {
      dispatch(logout())
    }).catch((error) => {
      console.error("Logout failed:", error)
    })
  }
  return (
    <button
      className='inline-block px-6 py-2 duration-200 bg-red-600 hover:bg-red-700 text-white rounded-full transition-all transform hover:scale-105 shadow-lg cursor-pointer'
      onClick={logouthandler}
    >Logout</button>
  )
}

export default Logoutbtn