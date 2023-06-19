
import { buttonVariants } from "@/components/shadecnui/button"
import Link from "next/link"
import { cn } from "./lib/utils"
import { ArrowRight } from "lucide-react"
import { getAuthSession } from "./lib/auth"
import { ImageCard } from "@/components/ui/ImageCard"
import Head from "next/head"


// export const metadata = {
//   title: 'ProFolio',
//   description: 'Create professional resumes with ease using ProFolio, the ultimate resume builder app.',
//   manifest: '/manifest.json',

// }

export default async function Home() {
  const session = await getAuthSession()
  return (
    <div>
      

      <div className="h-full max-w-2xl mx-auto flex flex-col items-center justify-center gap-10 text-white">

        <h1>Online Resume Builder</h1>
        <div className=" text-2xl text-center font-bold">Only 2% of resumes make it past the first round. Be in the top 2%</div>
        <p className="  text-center">Use professional field-tested resume templates that follow the exact ‘resume rules’ employers look for. Easy to use and done within minutes - try now for free!</p>
        <Link href={session?.user ? '/dashboard' : '/sign-in'} className={cn(buttonVariants({ variant: 'outline' }))}>Get Started<ArrowRight className="ml-2 h-4 w-4" /></Link>

      </div>
      <div className=" mt-28 h-full max-w-2xl mx-auto flex flex-col items-center justify-center gap-10 text-white">
        <div className="text-3xl text-center font-bold">Effortlessly make a job-worthy resume and cover letter that gets you hired faster</div>
        <ImageCard />


      </div>
      {/* Add more sections or content here */}

      <footer>
        {/* Add your footer content here */}
      </footer>
    </div>
  )
}
