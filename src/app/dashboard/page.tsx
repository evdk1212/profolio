"use client"

import { Button, buttonVariants } from '@/components/shadecnui/button'
import Link from 'next/link'
import React from 'react'
import { cn } from '../lib/utils'
import { Stepper, Step, Typography } from "@material-tailwind/react";
import { Briefcase, Code, Newspaper, Paperclip, School, User2 } from 'lucide-react'
import { Badge } from '@/components/shadecnui/badge'
import { Avatar } from '@radix-ui/react-avatar'

import {MainContentForm} from '@/components/ui/forms/MainContentForm'

const page = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);

  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);
  return (
    <>
      <Link href="/" >
        <Button className={cn(buttonVariants({ variant: "outline" }))}>
          Go Back
        </Button>
      </Link >
      <MainContentForm/>
      

     
    </>
  )
}

export default page