"use client"

import { Button, buttonVariants } from '@/components/shadecnui/button'
import Link from 'next/link'
import React from 'react'
import { cn } from '../lib/utils'
import { Stepper, Step, Typography } from "@material-tailwind/react";
import { Briefcase, Code, Newspaper, Paperclip, School, User2 } from 'lucide-react'

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
      <div className='hidden mt-10 md:block '>
        <Stepper
          activeStep={activeStep}
          isLastStep={(value) => setIsLastStep(value)}
          isFirstStep={(value) => setIsFirstStep(value)}

        >
          <Step onClick={() => setActiveStep(0)} >
            <User2 className="h-5 w-5" />
            <div className="absolute -bottom-[2.5rem] w-max text-center">
              <Typography
                variant="h6"
                color={activeStep === 0 ? "blue" : "blue-gray"}
              >
                Personal Details
              </Typography>
            </div>
          </Step>
          <Step onClick={() => setActiveStep(1)}>
            <Newspaper className="h-5 w-5" />
            <div className="absolute -bottom-[2.5rem] w-max text-center">
              <Typography
                variant="h6"
                color={activeStep === 1 ? "blue" : "blue-gray"}
              >
                Summary
              </Typography>

            </div>
          </Step>
          <Step onClick={() => setActiveStep(2)}>
            <Briefcase className="h-5 w-5" />
            <div className="absolute -bottom-[2.5rem] w-max text-center">
              <Typography
                variant="h6"
                color={activeStep === 2 ? "blue" : "blue-gray"}
              >
                Work History
              </Typography>

            </div>
          </Step>
          <Step onClick={() => setActiveStep(3)}>
            <Code className="h-5 w-5" />
            <div className="absolute -bottom-[2.5rem] w-max text-center">
              <Typography
                variant="h6"
                color={activeStep === 3 ? "blue" : "blue-gray"}
              >
                Skills
              </Typography>

            </div>
          </Step>
          <Step onClick={() => setActiveStep(4)}>
            <School className="h-5 w-5" />
            <div className="absolute -bottom-[2.5rem] w-max text-center">
              <Typography
                variant="h6"
                color={activeStep === 4 ? "blue" : "blue-gray"}
              >
                Education
              </Typography>

            </div>
          </Step>
        </Stepper>
        <div className={`${activeStep == 0 ? 'mt-14 text-white flex flex-col w-full justify-center' : 'hidden '}`}>
          <div className='flex flex-row justify-center'>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Your Name</span>
              </label>
              <label className="input-group">
                <span>Name</span>
                <input type="text" placeholder="Name here" className="input input-bordered" />
              </label>
            </div>
            <div className="form-control ml-2">
              <label className="label">
                <span className="label-text">Your Email</span>
              </label>
              <label className="input-group">
                <span>Email</span>
                <input type="text" placeholder="info@site.com" className="input input-bordered" />
              </label>
            </div>
            <div className="form-control ml-2">
              <label className="label">
                <span className="label-text">Your Role</span>
              </label>
              <label className="input-group">
                <span>Job Title</span>
                <input type="text" placeholder="Job Title" className="input input-bordered" />
              </label>
            </div>
          </div>
          <div className='flex flex-row justify-center'>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Contact Number</span>
              </label>
              <label className="input-group">
                <span>Contact</span>
                <input type="text" placeholder="+911234567890" className="input input-bordered" />
              </label>
            </div>
            <div className="form-control ml-2">
              <label className="label">
                <span className="label-text">Github</span>
              </label>
              <label className="input-group">
                <span>Github</span>
                <input type="text" placeholder="https://github.com/username" className="input input-bordered" />
              </label>
            </div>
            <div className="form-control ml-2">
              <label className="label">
                <span className="label-text">LinkedIn</span>
              </label>
              <label className="input-group">
                <span>LinkedIn</span>
                <input type="text" placeholder="https://linkedin.com/in/username" className="input input-bordered" />
              </label>
            </div>
          </div>
          <div className='flex flex-row justify-center'>
            <div className="form-control ">
              <label className="label">
                <span className="label-text">Portfolio Website</span>
              </label>
              <label className="input-group">
                <span>Portfolio</span>
                <input type="text" placeholder="Your Portfolio Website" className="input input-bordered w-full" />
              </label>
            </div>
          </div>

        </div>
        <div className={`${activeStep == 1 ? 'mt-14 text-white flex flex-col w-full justify-center' : 'hidden '}`}>
          <div className="form-control ">
            <label className="label">
              <span className="label-text">Summary</span>
            </label>

            <textarea placeholder="Bio" className="input input-bordered w-full" />

          </div>
        </div>
        <div className="mt-16 flex justify-between">
          <Button className={cn(buttonVariants({ variant: "outline" }))} onClick={handlePrev} disabled={isFirstStep}>
            Prev
          </Button>
          <Button className={cn(buttonVariants({ variant: "outline" }))} onClick={handleNext} disabled={isLastStep}>
            Next
          </Button>
        </div>
      </div>
      <div className=' mt-10 md:hidden'>

        <div>
          <ul className="steps  steps-vertical">
            <li className={`step ${activeStep >= 0 ? 'step-primary text-indigo-400' : ' text-indigo-900'} `}>Personal Details</li>
            <li className={`${activeStep >= 1 ? 'step step-primary text-indigo-400' : 'hidden'}`}>Summary</li>
            <li className={` ${activeStep >= 2 ? 'step step-primary text-indigo-400' : 'hidden'}`}>Work History</li>
            <li className={` ${activeStep >= 3 ? 'step step-primary text-indigo-400' : 'hidden'}`}>Skills</li>
            <li className={` ${activeStep == 4 ? 'step step-primary text-indigo-400' : 'hidden'}`}>Education</li>
          </ul>
        </div>
        <div className={`${activeStep == 0 ? ' text-white justify-center px-2 max-w-xs flex flex-col ' : 'hidden '}`}>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Your Name</span>
            </label>
            <input type="text" placeholder="Name here" className="input input-bordered" />
            
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Your Email</span>
            </label>
            <input type="text" placeholder="info@site.com" className="input input-bordered" />
            
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Your Role</span>
            </label>
            <input type="text" placeholder="Job Title" className="input input-bordered" />
            
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Contact Number</span>
            </label>
            <input type="text" placeholder="+911234567890" className="input input-bordered" />
            
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Github</span>
            </label>
            <input type="text" placeholder="https://github.com/username" className="input input-bordered" />
            
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">LinkedIn</span>
            </label>
            <input type="text" placeholder="https://linkedin.com/in/username" className="input input-bordered" />
          </div>


          <div className="form-control ">
            <label className="label">
              <span className="label-text">Portfolio Website</span>
            </label>
            <input type="text" placeholder="Your Portfolio Website" className="input input-bordered w-full" />
            
          </div>


        </div>
        <div className={`${activeStep == 1 ? ' text-white justify-center' : 'hidden '}`}>
          <div className="form-control ">
            <label className="label">
              <span className="label-text">Summary</span>
            </label>

            <textarea placeholder="Bio" className="input input-bordered w-full" />

          </div>
        </div>
        <div className="mt-16 flex justify-between">
          <Button className={cn(buttonVariants({ variant: "outline" }))} onClick={handlePrev} disabled={isFirstStep}>
            Prev
          </Button>
          <Button className={cn(buttonVariants({ variant: "outline" }))} onClick={handleNext} disabled={isLastStep}>
            Next
          </Button>
        </div>

      </div>
    </>
  )
}

export default page