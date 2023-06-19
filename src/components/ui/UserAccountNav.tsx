"use client"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { User } from 'next-auth'
import React, { FC, use } from 'react'
import { UserAvatar } from './UserAvatar'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { DropdownMenuLabel } from '../shadecnui/dropdown-menu'
import { LogOut, Settings, User as UserIcon } from 'lucide-react'
interface UserAccountNavProps {
    user: Pick<User, 'name' | 'email' | 'image'>
}
export const UserAccountNav: FC<UserAccountNavProps> = ({ user }) => {
    return <DropdownMenu>
        <DropdownMenuTrigger>
            <UserAvatar className='h-8 w-8' user={{
                name: user.name || null,
                image: user.image || null,
            }} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className='  bg-white p-5' align='end'>
            <DropdownMenuLabel className='mb-3 bg-zinc-100'>Control Center</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className='flex items-center mb-2  gap-2 bg-zinc-100'>
                <div className='flex flex-col space-y-1 leading-none'>
                    {user.name && <p className='font-medium'>{user.name}</p>}
                    {user.email && <p className='w-[200px] truncate text-sm text-zinc-700'>{user.email}</p>}
                </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='flex items-center gap-2 mb-2 bg-zinc-100' asChild >
                <div><UserIcon className="h-4 w-4 " />
                <Link href={'/profile'}>Profile</Link></div>
            </DropdownMenuItem>
            
            <DropdownMenuItem className='flex items-center gap-2 mb-2 bg-zinc-100' asChild>
            <div><Settings className="h-4 w-4 " />
                <Link href={'/settings'}>Settings</Link></div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild  onSelect={(event) => {
                event.preventDefault()
                signOut({
                    callbackUrl: `${window.location.origin}/sign-in`
                })
            }} className='flex items-center gap-2 cursor-pointer bg-zinc-100'>
                <div><LogOut className="h-4 w-4 " />
                <div >Sign Out</div></div>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
}
