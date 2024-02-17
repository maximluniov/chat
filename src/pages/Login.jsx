import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from "firebase/auth";


const Login = () => {
    const navigate = useNavigate();
    const [err, setErr] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault()

        const email = e.target[0].value;
        const password = e.target[1].value;

        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                setErr(false)
                navigate('/')
            })
            .catch(() => {
                setErr(true)
                setTimeout(() => {
                    setErr(false)
                }, 5000);
            });
    }



    return (




        <div className='flex flex-col h-lvh items-center justify-center bg-indigo-50 font'>
            <h1 className='text-5xl mb-4'>Welcome to S-Chat!</h1>
            <div className='bg-indigo-100   px-20 py-6 rounded-xl '>

                <div className='flex justify-between'>
                    <h2>Log in</h2>
                    {err && <div className='font-bold text-red-400 error'>Wrong e-mail or password</div>}
                </div>
                <form className='flex flex-col gap-y-1 ' onSubmit={handleSubmit}>
                    <input className='bg-white flex w-full h-10 items-center my-2 p-2 ' type="email" placeholder='Your e-mail' />
                    <input className='bg-white flex w-full h-10 items-center my-2 p-2 ' type="password" placeholder='password' />
                    <button type='submit' className='w-full p-2 bg-indigo-400 rounded-md '>Sign In</button>
                </form>

                <p className='mt-4'>
                    You don't have an account?
                    <Link to='/registration' className='text-sky-600'>Register</Link>

                </p>
            </div>
        </div>

    )
}

export default Login


