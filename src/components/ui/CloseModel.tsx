"use client"
import React from 'react'
import { Button } from '../shadecnui/button'
import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'

export const CloseModel = () => {
    const router = useRouter()
  return <Button onClick={()=> router.back()} variant={'subtle'}  className="h-6 w-6 p-0 rounded-md" aria-label='close model'><X className='h-4 w-4'/></Button>
}
