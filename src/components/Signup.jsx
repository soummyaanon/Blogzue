import React, { useState } from 'react'
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'
import { Button, Input, Logo } from './index.js'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'

function Signup() {
  const navigate = useNavigate()
  const [error, setError] = useState("")
  const dispatch = useDispatch()
  const { register, handleSubmit, formState: { errors }, setError: setFormError } = useForm()

  const create = async (data) => {
    setError("")
    try {
      const userData = await authService.createAccount(data)
      if (userData) {
        const userData = await authService.getCurrentUser()
        if (userData) dispatch(login(userData));
        navigate("/")
      }
    } catch (error) {
      setError(error.message)
    }
  }

  const onSubmit = (data) => {
    if (data.email && !(data.email.endsWith('@gmail.com') || data.email.endsWith('@yahoo.com') || data.email.endsWith('@outlook.com'))) {
      setFormError('email', {
        type: 'endsWithValidDomain',
        message: 'Email address must end with @gmail.com, @yahoo.com, or @outlook.com'
      });
      window.alert('Email address must end with @gmail.com, @yahoo.com, or @outlook.com');
      return;
    }
    create(data);
  };

  return (
<div className="flex items-center justify-center w-full bg-transparent backdrop-filter bg-black h-screen animate-fade-in">
  <div className="mx-auto w-full max-w-lg bg-gray-800 rounded-xl p-10 border-4 border-gray-700 border-opacity-75">
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

    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-8">
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
      <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transform active:scale-90">
        Create Account
      </Button>
    </form>
  </div>
</div>
  )
}

export default Signup