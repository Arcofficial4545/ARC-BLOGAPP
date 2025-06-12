import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import {Button, Input, Logo} from "./index"
import {useDispatch} from "react-redux"
import authService from "../appwrite/auth"
import {useForm} from "react-hook-form"

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const login = async(data) => {
        setError("")
        setLoading(true)
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(authLogin(userData));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

  return (
    <div className='flex items-center justify-center py-12 px-4'>
        <div className='w-full max-w-md'>
            <div className='bg-gradient-to-br from-slate-800 to-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-600'>
                <div className="text-center mb-8">
                    <div className="mb-4">
                        <Logo width="80px" />
                    </div>
                    <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
                    <p className="text-gray-300 mt-2">Sign in to your account to continue</p>
                </div>
                
                {error && (
                    <div className="bg-red-900/50 border border-red-600 text-red-300 px-4 py-3 rounded-lg mb-6">
                        {error}
                    </div>
                )}
                
                <form onSubmit={handleSubmit(login)} className='space-y-6'>
                    <Input
                        label="Email"
                        placeholder="Enter your email"
                        type="email"
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPatern: (value) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Email address must be a valid address",
                            }
                        })}
                    />
                    <Input
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", {
                            required: true,
                        })}
                    />
                    <Button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 py-3 font-medium"
                        disabled={loading}
                    >
                        {loading ? (
                            <div className="flex items-center justify-center">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                Signing in...
                            </div>
                        ) : (
                            'Sign In'
                        )}
                    </Button>
                </form>
                
                <p className="text-center text-gray-600 mt-6">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-blue-600 hover:text-blue-700 font-medium">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    </div>
  )
}

export default Login