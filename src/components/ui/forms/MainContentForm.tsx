"use client"
import { cn } from '@/app/lib/utils'
import { ContentCreationRequest } from '@/app/lib/validators/content'
import { toast } from '@/components/hooks/use-toast'
import { Button, buttonVariants } from '@/components/shadecnui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { Step, Stepper, Typography } from '@material-tailwind/react'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { Briefcase, CalendarIcon, Code, Newspaper, School } from 'lucide-react'
import { User2 } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/shadecnui/form"
import { z } from 'zod'
import { Input } from '@/components/shadecnui/input'
import { Textarea } from '@/components/shadecnui/textarea'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/shadecnui/popover'
import { format } from "date-fns"
import { Calendar } from '@/components/shadecnui/calendar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/shadecnui/select'
const FormSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    email: z.string().email({ message: "Invalid email address" }),
    role: z.string().min(2, {
        message: "Role must be at least 2 characters.",
    }),
    mobile: z.string().min(10, {
        message: "invalid mobile number"
    }),
    github: z.string().url().optional(),
    linkedin: z.string().url().optional(),
    portfolio: z.string().url().optional(),
    company: z.string().min(2, {
        message: "Company must be at least 2 characters.",
    }),
    jobtitle: z.string().min(2, {
        message: "JobTitle must be at least 2 characters.",
    }),
    companywebsite: z.string().url(),
    employmenttype: z
        .string({
            required_error: "Please select an type to continue.",
        }),
    country: z.string().min(2, {
        message: "Country must be at least 2 characters.",
    }),
    city: z.string().min(2, {
        message: "City must be at least 2 characters.",
    }),
    from: z.date({
        required_error: "A date of FROM is required.",
    }).optional(),
    to: z.date({
        required_error: "A date of TO is required.",
    }).optional(),
    bio: z
        .string()
        .min(10, {
            message: "Bio must be at least 10 characters.",
        })
        .max(160, {
            message: "Bio must not be longer than 30 characters.",
        }),

})
export function MainContentForm() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [isLastStep, setIsLastStep] = React.useState(false);
    const [isFirstStep, setIsFirstStep] = React.useState(false);

    const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
    const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    const pathname = usePathname()
    const router = useRouter()
    const { mutate: createResume } = useMutation({
        mutationFn: async ({
            title,
            content,
        }: ContentCreationRequest) => {
            const payload: ContentCreationRequest = { title, content }
            const { data } = await axios.post('/api/resume/create', payload)
            return data
        },
        onError: () => {
            return toast({
                title: 'Something went wrong.',
                description: 'Your post was not published. Please try again.',
                variant: 'destructive',
            })
        },
        onSuccess: () => {
            // turn pathname /r/mycommunity/submit into /r/mycommunity
            const newPathname = pathname.split('/').slice(0, -1).join('/')
            router.push(newPathname)

            router.refresh()

            return toast({
                description: 'Your post has been published.',
            })
        },
    })
    function onSubmit(data: z.infer<typeof FormSchema>) {
        const payload: ContentCreationRequest = {
            title: "Resume 1",
            content: JSON.stringify(data, null, 2)

        }
        createResume(payload)
    }
    return (
        <>
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
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className=" justify-center" >
                            <div className={`${activeStep == 0 ? 'mt-14 text-white ' : 'hidden '}`}>
                                <div className="flex flex-row  justify-center">
                                    <div className="w-2/3">
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Name</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="This is your legal name. " {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="ml-4 w-2/3">
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Email</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="info@iam-deepak.me" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                    </div>
                                </div>
                                <div className="flex flex-row  justify-center mt-4">
                                    <div className="w-2/3">
                                        <FormField
                                            control={form.control}
                                            name="role"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Job Title</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Your Role" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className="ml-4 w-2/3">
                                        <FormField
                                            control={form.control}
                                            name="mobile"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Contact Number</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="1234567890" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-row  justify-center mt-4">
                                    <div className="w-2/3">
                                        <FormField
                                            control={form.control}
                                            name="github"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Github</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="https://github.com/username" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="ml-4 w-2/3">
                                        <FormField
                                            control={form.control}
                                            name="linkedin"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>LinkedIn</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="https://linkedin.com/in/username" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                                <div className="w-2/3 mx-auto mt-4  justify-center items-center">
                                    <FormField
                                        control={form.control}
                                        name="portfolio"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Portfolio Website</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Link here" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            <div className={`${activeStep == 1 ? 'mt-14 text-white ' : 'hidden '}`}>
                                <FormField
                                    control={form.control}
                                    name="bio"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Bio</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Tell us a little bit about yourself"
                                                    className="resize-none"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className={`${activeStep == 2 ? 'mt-14 text-white ' : 'hidden '}`}>
                                <div className="flex flex-row  justify-center ">
                                    <div className="w-2/3">
                                        <FormField
                                            control={form.control}
                                            name="company"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Company</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Company name" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="ml-4 w-1/3">
                                        <FormField
                                            control={form.control}
                                            name="jobtitle"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Job Title</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Job Title" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                    </div>
                                </div>
                                <div className="flex flex-row  justify-center mt-4">
                                    <div className="w-2/3">
                                        <FormField
                                            control={form.control}
                                            name="companywebsite"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Company Website</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="https://company.com" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className="ml-4 w-1/3">
                                        <FormField control={form.control} name="employmenttype" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Employment Type</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select a verified email to display" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="Full-Time">Full-Time</SelectItem>
                                                        <SelectItem value="Part-Time">Part-Time</SelectItem>
                                                        <SelectItem value="Contract">Contract</SelectItem>
                                                        <SelectItem value="Freelance">Freelance</SelectItem>
                                                        <SelectItem value="Self-Employed">Self-Employed</SelectItem>
                                                        <SelectItem value="Part-Time">Part-Time</SelectItem>
                                                        <SelectItem value="Internship">Internship</SelectItem>
                                                    </SelectContent>
                                                </Select>

                                            </FormItem>
                                        )} />
                                    </div>
                                </div>
                                <div className="flex flex-row  justify-center mt-4 ">
                                    <div className="w-2/3">
                                        <FormField
                                            control={form.control}
                                            name="country"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Country</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Country" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="ml-4 w-2/3">
                                        <FormField
                                            control={form.control}
                                            name="city"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>City</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="City" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                    </div>
                                </div>
                                <div className="flex flex-row  justify-center mt-4 ">
                                    <div >
                                        <FormField
                                            control={form.control}
                                            name="from"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-col">
                                                    <FormLabel>From</FormLabel>
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <FormControl>
                                                                <Button
                                                                    variant={"outline"}
                                                                    className={cn(
                                                                        "w-[240px] pl-3 text-left font-normal",
                                                                        !field.value && "text-muted-foreground"
                                                                    )}
                                                                >
                                                                    {field.value ? (
                                                                        format(field.value,"PPP")
                                                                    ) : (
                                                                        <span>Pick a date</span>
                                                                    )}
                                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                </Button>
                                                            </FormControl>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-auto p-0" align="start">
                                                            <Calendar
                                                                mode="single"
                                                                selected={field.value}
                                                                onSelect={field.onChange}
                                                                disabled={(date) =>
                                                                    date > new Date() || date < new Date("1900-01-01")
                                                                }
                                                                initialFocus
                                                            />
                                                        </PopoverContent>
                                                    </Popover>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="ml-4">
                                        <FormField
                                            control={form.control}
                                            name="to"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-col">
                                                    <FormLabel>To</FormLabel>
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <FormControl>
                                                                <Button
                                                                    variant={"outline"}
                                                                    className={cn(
                                                                        "w-[240px] pl-3 text-left font-normal",
                                                                        !field.value && "text-muted-foreground"
                                                                    )}
                                                                >
                                                                    {field.value ? (
                                                                        format(field.value,"PPP")
                                                                    ) : (
                                                                        <span>Pick a date</span>
                                                                    )}
                                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                </Button>
                                                            </FormControl>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-auto p-0" align="start">
                                                            <Calendar
                                                                mode="single"
                                                                selected={field.value}
                                                                onSelect={field.onChange}
                                                                disabled={(date) =>
                                                                    date > new Date() || date < new Date("1900-01-01")
                                                                }
                                                                initialFocus
                                                            />
                                                        </PopoverContent>
                                                    </Popover>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                                <div className="w-1/3 mx-auto mt-4  justify-center items-center">
                                    <FormField
                                        control={form.control}
                                        name="portfolio"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Portfolio Website</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Link here" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="mt-16 flex justify-between">
                                <Button className={cn(buttonVariants({ variant: "outline" }))} onClick={handlePrev} disabled={isFirstStep}>
                                    Prev
                                </Button>
                                {isLastStep ? <Button type='submit' className={cn(buttonVariants({ variant: "outline" }))} >
                                    Submit
                                </Button> : <Button className={cn(buttonVariants({ variant: "outline" }))} onClick={handleNext} disabled={isLastStep}>
                                    Next
                                </Button>}
                            </div>
                        </form>
                    </Form>



                </div>

            </div>



            <div className=' mt-10 md:hidden'>

                <div>
                    <ul>
                        {/* <li className={` ${activeStep == 0 ? ' text-white' : ' hidden'} `}><Badge>Personal Details</Badge></li> */}
                        <div className={` ${activeStep == 0 ? ' flex flex-col mx-auto justify-center' : ' hidden'} `}>
                            <User2 className='text-white mx-auto justify-center items-center' />
                            <div className='text-white mx-auto justify-center items-center text-sm mt-3'>Personal Details</div>
                        </div>
                        <div className={` ${activeStep == 1 ? ' flex flex-col mx-auto justify-center' : ' hidden'} `}>
                            <Newspaper className='text-white mx-auto justify-center items-center' />
                            <div className='text-white mx-auto justify-center items-center text-sm mt-3'>Summary</div>
                        </div>
                        <div className={` ${activeStep == 2 ? ' flex flex-col mx-auto justify-center' : ' hidden'} `}>
                            <Briefcase className='text-white mx-auto justify-center items-center' />
                            <div className='text-white mx-auto justify-center items-center text-sm mt-3'>Work History</div>
                        </div>
                        <div className={` ${activeStep == 3 ? ' flex flex-col mx-auto justify-center' : ' hidden'} `}>
                            <Code className='text-white mx-auto justify-center items-center' />
                            <div className='text-white mx-auto justify-center items-center text-sm mt-3'>Skills</div>
                        </div>
                        <div className={` ${activeStep == 4 ? ' flex flex-col mx-auto justify-center' : ' hidden'} `}>
                            <School className='text-white mx-auto justify-center items-center' />
                            <div className='text-white mx-auto justify-center items-center text-sm mt-3'>Education</div>
                        </div>
                    </ul>
                </div>
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className=" justify-center" >
                            <div className={`${activeStep == 0 ? 'mt-14 text-white ' : 'hidden '}`}>
                                
                                    <div >
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Name</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="This is your legal name. " {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className=" mt-4">
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Email</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="info@iam-deepak.me" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                    </div>
                                
                                
                                    <div className="mt-4">
                                        <FormField
                                            control={form.control}
                                            name="role"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Job Title</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Your Role" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className="mt-4">
                                        <FormField
                                            control={form.control}
                                            name="mobile"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Contact Number</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="1234567890" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                             
                                
                                    <div className="mt-4">
                                        <FormField
                                            control={form.control}
                                            name="github"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Github</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="https://github.com/username" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <FormField
                                            control={form.control}
                                            name="linkedin"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>LinkedIn</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="https://linkedin.com/in/username" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                
                                <div className="mt-4">
                                    <FormField
                                        control={form.control}
                                        name="portfolio"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Portfolio Website</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Link here" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            <div className={`${activeStep == 1 ? 'mt-14 text-white ' : 'hidden '}`}>
                                <FormField
                                    control={form.control}
                                    name="bio"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Bio</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Tell us a little bit about yourself"
                                                    className="resize-none"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className={`${activeStep == 2 ? 'mt-14 text-white ' : 'hidden '}`}>
                               
                                    <div >
                                        <FormField
                                            control={form.control}
                                            name="company"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Company</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Company name" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <FormField
                                            control={form.control}
                                            name="jobtitle"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Job Title</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Job Title" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                    </div>
                                
                                
                                    <div className="mt-4">
                                        <FormField
                                            control={form.control}
                                            name="companywebsite"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Company Website</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="https://company.com" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className="mt-4">
                                        <FormField control={form.control} name="employmenttype" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Employment Type</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select a verified email to display" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="Full-Time">Full-Time</SelectItem>
                                                        <SelectItem value="Part-Time">Part-Time</SelectItem>
                                                        <SelectItem value="Contract">Contract</SelectItem>
                                                        <SelectItem value="Freelance">Freelance</SelectItem>
                                                        <SelectItem value="Self-Employed">Self-Employed</SelectItem>
                                                        <SelectItem value="Part-Time">Part-Time</SelectItem>
                                                        <SelectItem value="Internship">Internship</SelectItem>
                                                    </SelectContent>
                                                </Select>

                                            </FormItem>
                                        )} />
                                    </div>
                            
                                
                                    <div className="mt-4">
                                        <FormField
                                            control={form.control}
                                            name="country"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Country</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Country" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <FormField
                                            control={form.control}
                                            name="city"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>City</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="City" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                    </div>
                                
                               
                                    <div className='mt-4'>
                                        <FormField
                                            control={form.control}
                                            name="from"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-col">
                                                    <FormLabel>From</FormLabel>
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <FormControl>
                                                                <Button
                                                                    variant={"outline"}
                                                                    className={cn(
                                                                        "w-[240px] pl-3 text-left font-normal",
                                                                        !field.value && "text-muted-foreground"
                                                                    )}
                                                                >
                                                                    {field.value ? (
                                                                        format(field.value, "PPP")
                                                                    ) : (
                                                                        <span>Pick a date</span>
                                                                    )}
                                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                </Button>
                                                            </FormControl>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-auto p-0" align="start">
                                                            <Calendar
                                                                mode="single"
                                                                selected={field.value}
                                                                onSelect={field.onChange}
                                                                disabled={(date) =>
                                                                    date > new Date() || date < new Date("1900-01-01")
                                                                }
                                                                initialFocus
                                                            />
                                                        </PopoverContent>
                                                    </Popover>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <FormField
                                            control={form.control}
                                            name="to"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-col">
                                                    <FormLabel>To</FormLabel>
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <FormControl>
                                                                <Button
                                                                    variant={"outline"}
                                                                    className={cn(
                                                                        "w-[240px] pl-3 text-left font-normal",
                                                                        !field.value && "text-muted-foreground"
                                                                    )}
                                                                >
                                                                    {field.value ? (
                                                                        format(field.value, "PPP")
                                                                    ) : (
                                                                        <span>Pick a date</span>
                                                                    )}
                                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                </Button>
                                                            </FormControl>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-auto p-0" align="start">
                                                            <Calendar
                                                                mode="single"
                                                                selected={field.value}
                                                                onSelect={field.onChange}
                                                                disabled={(date) =>
                                                                    date > new Date() || date < new Date("1900-01-01")
                                                                }
                                                                initialFocus
                                                            />
                                                        </PopoverContent>
                                                    </Popover>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                
                                <div className="mt-4">
                                    <FormField
                                        control={form.control}
                                        name="portfolio"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Portfolio Website</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Link here" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="mt-16 flex justify-between">
                                <Button className={cn(buttonVariants({ variant: "outline" }))} onClick={handlePrev} disabled={isFirstStep}>
                                    Prev
                                </Button>
                                {isLastStep ? <Button type='submit' className={cn(buttonVariants({ variant: "outline" }))} >
                                    Submit
                                </Button> : <Button className={cn(buttonVariants({ variant: "outline" }))} onClick={handleNext} disabled={isLastStep}>
                                    Next
                                </Button>}
                            </div>
                        </form>
                    </Form>



                </div>

            </div>
        </>
    )
}
