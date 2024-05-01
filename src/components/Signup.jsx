import React, {useState} from 'react'
import authService from '../appwrite/auth'
import {Link ,useNavigate} from 'react-router-dom'
import {login} from '../store/authSlice'
import {Button, Input, Logo} from './index.js'
import {useDispatch} from 'react-redux'
import {useForm} from 'react-hook-form'

function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()

    const create = async(data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(login(userData));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

return (
    <div className="flex items-center justify-center bg-gray-900 h-screen">
        <div className="mx-auto w-96 rounded-xl p-10 border-4 border-gray-700 border-opacity-75 shadow-lg bg-gray-800">
            <div className="mb-2 flex justify-center">
                <span className="inline-block w-full max-w-[100px]">
                    <Logo width="100%" />
                </span>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight text-white">Join Our Community</h2>
            <p className="mt-2 text-center text-base text-gray-400">
                Already have an account?&nbsp;
                <Link
                    to="/login"
                    className="font-medium text-blue-500 transition-all duration-200 hover:underline"
                >
                    Sign In
                </Link>
            </p>
            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

            <form onSubmit={handleSubmit(create)} className="space-y-5 mt-8">
                <Input
                    label={<label className="text-white font-bold">Full Name: </label>}
                    placeholder="Enter your full name"
                    {...register("name", {
                        required: true,
                    })}
                />
                <Input
                    label={<label className="text-white font-bold">Email: </label>}
                    placeholder="Enter your email"
                    type="email"
                    {...register("email", {
                        required: true,
                        validate: {
                            matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                            "Email address must be a valid address",
                        }
                    })}
                />
                <Input
                    label={<label className="text-white font-bold">Password: </label>}
                    type="password"
                    placeholder="Enter your password"
                    {...register("password", {
                        required: true,
                    })}
                />
                <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Create Account
                </Button>
            </form>
        </div>
    </div>
)
}

export default Signup