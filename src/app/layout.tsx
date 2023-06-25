
import NavBar from '../components/ui/NavBar'

import { Inter } from 'next/font/google'

import '../styles/globals.css'
import { Toaster } from '../components/ui/Toaster'
import { cn } from './lib/utils'
import Providers from '@/components/Providers'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'FolioMaster',
  description: 'Create professional resumes with ease using ProFolio, the ultimate resume builder app.',
}

export default function RootLayout({
  children,
  authModel,
}: {
  children: React.ReactNode
  authModel: React.ReactNode
}) {
  return (


    <html lang="en" className={cn('bg-black antialiased light', inter.className)}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-icon.png"></link>
      </head>
      <body className={'min-h-screen pt-12 bg-black antialiased'}>
        <Providers>
          {/* @ts-expect-error Server Component */}
          <NavBar/>
          {authModel}
          <div className={'container max-w-7xl mx-auto h-full pt-12 '} >


            {children}

          </div>
        </Providers>
        <Toaster />
      </body>
    </html>

  )
}
