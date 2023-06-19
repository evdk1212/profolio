import React from 'react'
import { Icons } from './Icons'
import Link from 'next/link'
import { UserAuthForm } from './UserAuthForm'

export const SignUp = () => {
  return <div className='container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]'>
    <div className='flex flex-col text-center space-y-2'>
        <Icons.logo className='mx-auto h-6 w-6'/>
        <h1 className='text-2xl font-semibold tracking-tight text-slate-100'>Create an Account</h1>
        <p className='text-sm max-w-xs mx-auto text-slate-300'>
            By continuing, you are setting up a ProFolio account and agree to our User Agreement and Privacy Policy
        </p>
        <UserAuthForm />
        <p className='px-8 text-center text-sm text-slate-400'>
            Already have an account?{' '}
            <Link href={'/sign-in'} className='hover:text-zinc-500 text-sm underline underline-offest-4'>Sign In</Link>
        </p>
    </div>
  </div>
}
