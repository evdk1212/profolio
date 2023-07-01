

import { Button, buttonVariants } from '@/components/shadecnui/button'
import Link from 'next/link'
import React from 'react'
import { cn } from '../lib/utils'

import { MainContentForm } from '@/components/ui/forms/MainContentForm'
import { getAuthSession } from '../lib/auth'
import { SignIn } from '@/components/ui/SignIn'

export default async function  page() {
  const session = await getAuthSession()
  
  return (
    <>
      {session?.user ? <><Link href="/" >
        <Button className={cn(buttonVariants({ variant: "outline" }))}>
          Go Back
        </Button>
      </Link >
        <MainContentForm /></> : SignIn()}




    </>
  )
}

