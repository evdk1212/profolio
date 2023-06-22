"use client"

import { cn } from "@/app/lib/utils"
import { toast } from "@/components/hooks/use-toast"
import { Button, buttonVariants } from "@/components/shadecnui/button"
import { Calendar } from "@/components/shadecnui/calendar"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/shadecnui/form"
import { Input } from "@/components/shadecnui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/shadecnui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/shadecnui/select"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"



const FormSchema = z.object({
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
    }),
    to: z.date({
        required_error: "A date of TO is required.",
    }),
    mobile: z.string().min(10, {
        message: "invalid mobile number"
    }),
    github: z.string().url().optional(),
    linkedin: z.string().url().optional(),
    portfolio: z.string().url().optional()

})

export function WorkHistoryFormDektop() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-black">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className=" justify-center" >
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
                                    {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
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
                                    {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
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
                                    {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
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
                                    {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
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
                                    {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
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
                                                // onSelect={field.onChange}
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
                                                // onSelect={field.onChange}
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
                                {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button type="submit" className={cn(buttonVariants({ variant: "outline" }))}>Submit</Button>
            </form>
        </Form>
    )
}
