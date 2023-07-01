
import { cn } from "@/app/lib/utils";
import { buttonVariants } from "@/components/shadecnui/button";
import { SignIn } from "@/components/ui/SignIn";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";


import React, { FC } from 'react'

const page:FC =({})=>{
    // const session = await getAuthSession();
//     return <>{session?.user?<div className="h-screen flex flex-col mx-auto my-auto justify-center items-center"><Link href={'/dashboard'}  className={cn(buttonVariants({variant:'outline'}))}>Dashboard</Link></div>:<div className="absolute inset-0">
//     <div className="h-full max-w-2xl mx-auto flex flex-col items-center justify-center gap-20">
//         <Link href={'/'} className={cn(buttonVariants({variant:'ghost'}),'self-start -mt-20')}><ChevronLeft className="mr-2 h-4 w-4"/> Home</Link>
//         <SignIn/>
//     </div>
// </div>}</> 
return <div className="absolute inset-0">
<div className="h-full max-w-2xl mx-auto flex flex-col items-center justify-center gap-20">
    <Link href={'/'} className={cn(buttonVariants({variant:'ghost'}),'self-start -mt-20')}><ChevronLeft className="mr-2 h-4 w-4"/> Home</Link>
    <SignIn/>
</div>
</div>
}
export default page
