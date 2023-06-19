import Link from "next/link";
import { Icons } from "./Icons";
import { buttonVariants } from "../shadecnui/button";
import { getAuthSession } from "@/app/lib/auth";
import { UserAccountNav } from "./UserAccountNav";
import { NavMenu } from "./NavMenu";

const NavBar= async()=>{
    const session = await getAuthSession()
    return <div className="fixed top-0 inset-x-0 h-fit bg-black border-b border-zinc-700 z-[10] py-6  " >
            <div className="container max-w-7xl h-full mx-auto flex items-center justify-between gap-2">
                <Link href={'/'} className="flex gap-2 items-center">
                    <Icons.logo className={"h-8 w-8 sm:h-6 sm:w-6"}/>
                    <p className="hidden text-white text-sm font-medium md:block">FolioMaster</p>
                </Link>
                <NavMenu />
                { 
                session?.user ? (<UserAccountNav user={session.user}/>):
                (<Link href={'/sign-in'} className={ buttonVariants({variant:"outline"}) }>Sign In</Link>)
                }
            </div> 
        </div>
    
}
export default NavBar;