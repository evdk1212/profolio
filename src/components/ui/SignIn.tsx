import React from 'react'
import { Icons } from './Icons'
import Link from 'next/link'
import { UserAuthForm } from './UserAuthForm'

export const SignIn = () => {
  return <div className='h-screen flex flex-col justify-center items-center'>
    <div className='container  mx-auto my-auto bg-white rounded-md w-2/5  '>
    <div className='container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]  py-5'>
    <div className='flex flex-col text-center space-y-2'>
        <Icons.logo className='mx-auto h-6 w-6'/>
        <h1 className='text-2xl font-semibold tracking-tight text-slate-100'>Welcome Back</h1>
        <p className='text-sm max-w-xs mx-auto text-slate-300'>
            By continuing, you are setting up a ProFolio account and agree to our User Agreement and Privacy Policy
        </p>
        <UserAuthForm />
        <p className='px-8 text-center text-sm text-slate-400'>
            New to ProFolio?{' '}
            <Link href={'/sign-up'} className='hover:text-zinc-500 text-sm underline underline-offest-4'>Sign Up</Link>
        </p>
    </div>
  </div>
  </div>
  </div>
}
