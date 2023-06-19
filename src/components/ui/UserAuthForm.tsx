"use client"
import React, { FC, useState } from 'react'
import { Button, buttonVariants } from '../shadecnui/button'

import {signIn} from 'next-auth/react';
import { Icons } from './Icons';
import { useToast } from '../hooks/use-toast';
import { cn } from '@/app/lib/utils';


interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement>{

}
export const UserAuthForm:FC<UserAuthFormProps> = ({className,...props}) => {
    const [isLoading,setIsLoading]=useState<boolean>(false);
    const {toast} = useToast()
    const loginWithGoogle = async()=>{
        setIsLoading(true)
        try {
            // throw new Error()
            await signIn("google")
        } catch (error) {
            toast({
                title: 'There was a problem.',
                description: 'There was an error logging in with google.',
                variant:'destructive'
            })
        } finally{
            setIsLoading(false);
        }
    }
  return  <div className={cn('flex justify-center',className)}{...props}>
    <Button onClick={loginWithGoogle} isLoading={isLoading} size='sm' className={cn(buttonVariants({variant:'outline'}),'w-full')} >{isLoading?null:<Icons.google className='mx-1 h-4 w-4'/>}Google</Button>
    </div>
  
}
