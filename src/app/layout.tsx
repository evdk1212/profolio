
import NavBar from '../components/ui/NavBar'

import { Inter } from 'next/font/google'

import '../styles/globals.css'
import { Toaster } from '../components/ui/Toaster'
import { cn } from './lib/utils'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ProFolio',
  description: 'Create Industry Acceptable Resume',
}

export default function RootLayout({
  children,
  authModel,
}: {
  children: React.ReactNode
  authModel: React.ReactNode
}) {
  return (
    <html lang="en" className={cn('bg-black antialiased light',inter.className)}>
      <body className={'min-h-screen pt-12 bg-black antialiased'}>
        <NavBar/>
        {authModel}
        <div className={'container max-w-7xl mx-auto h-full pt-12 '} >
          {children}
        </div>
        <Toaster/>
        </body>
    </html>
  )
}
