"use client"

import { Button, buttonVariants } from '@/components/shadecnui/button'
import Link from 'next/link'
import React from 'react'
import { cn } from '../lib/utils'
import { Stepper, Step, Typography } from "@material-tailwind/react";
import { Briefcase, Code, Newspaper, Paperclip, School, User2 } from 'lucide-react'
import { PersonalDetailsFormDesktop } from '@/components/ui/forms/desktop/PersonalDetailsFormDesktop'
import { PersonalDetailsFormMobile } from '@/components/ui/forms/mobile/PersonalDetailsFormMobile'
import { Badge } from '@/components/shadecnui/badge'
import { Avatar } from '@radix-ui/react-avatar'
import { SummaryDetailsForm } from '@/components/ui/forms/summaryDetailsForm'
import { WorkHistoryFormDektop } from '@/components/ui/forms/desktop/workHistoryFormDesktop'

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
        <div className={`${activeStep == 0 ? 'mt-14 text-white ' : 'hidden '}`}>
          <PersonalDetailsFormDesktop/>
          

        </div>
        <div className={`${activeStep == 1 ? 'mt-14 text-white ' : 'hidden '}`}>
          <SummaryDetailsForm/>
        </div>
        <div className={`${activeStep == 2 ? 'mt-14 text-white ' : 'hidden '}`}>
          <WorkHistoryFormDektop/>
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
          <ul>
            {/* <li className={` ${activeStep == 0 ? ' text-white' : ' hidden'} `}><Badge>Personal Details</Badge></li> */}
            <div className={` ${activeStep == 0 ? ' flex flex-col mx-auto justify-center' : ' hidden'} `}>
              <User2 className='text-white mx-auto justify-center items-center'/>
              <div className='text-white mx-auto justify-center items-center text-sm mt-3'>Personal Details</div>
            </div>
            <div className={` ${activeStep == 1 ? ' flex flex-col mx-auto justify-center' : ' hidden'} `}>
              <Newspaper className='text-white mx-auto justify-center items-center'/>
              <div className='text-white mx-auto justify-center items-center text-sm mt-3'>Summary</div>
            </div>
            <div className={` ${activeStep == 2 ? ' flex flex-col mx-auto justify-center' : ' hidden'} `}>
              <Briefcase className='text-white mx-auto justify-center items-center'/>
              <div className='text-white mx-auto justify-center items-center text-sm mt-3'>Work History</div>
            </div>
            <div className={` ${activeStep == 3 ? ' flex flex-col mx-auto justify-center' : ' hidden'} `}>
              <Code className='text-white mx-auto justify-center items-center'/>
              <div className='text-white mx-auto justify-center items-center text-sm mt-3'>Skills</div>
            </div>
            <div className={` ${activeStep == 4 ? ' flex flex-col mx-auto justify-center' : ' hidden'} `}>
              <School className='text-white mx-auto justify-center items-center'/>
              <div className='text-white mx-auto justify-center items-center text-sm mt-3'>Education</div>
            </div>
          </ul>
        </div>
        <div className={`${activeStep == 0 ? ' text-white justify-center px-2 max-w-xs flex flex-col mt-4' : 'hidden '}`}>

          <PersonalDetailsFormMobile />


        </div>
        <div className={`${activeStep == 1 ? ' text-white justify-center' : 'hidden '}`}>
          <SummaryDetailsForm/>
        </div>
        <div className="mt-16 flex justify-between mb-4">
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