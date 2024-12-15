import React from 'react'
import Link from 'next/link';
import DashboardLinks from '../components/dashboard-links';
import { Menu, User2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { signOut } from '@/utils/auth';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Toaster } from '@/components/ui/sonner';
import Logo from '../components/logo';
import { ModeToggle } from '../components/mode-toggle';


const DashboardLayout = async ({
  children
}: { children: React.ReactNode }) => {
  // const session = await requiredUser();
  return (

    <><div className='grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
      <div className='hidden border-r bg-muted/40 md:block'>
        <div className='flex flex-col max-h-screen h-full gap-2 '>
          <div className='h-14 border-b px-4 lg:h-[60px] lg:px-6 flex items-center'>
         
                <Logo/>
          </div>
          <div className='flex-1'>
            <nav className='grid items-start px-2 text-sm font-medium lg:px-4'>
              <DashboardLinks />
            </nav>
          </div>
        </div>
      </div>
      {/** Mobile */}
      <div className='flex flex-col '>
        <header className='flex h-14 items-center gap-4 border-b bg-muted/40 lg:h-[60px] lg:px-6'>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <nav>
                <DashboardLinks />
              </nav>
            </SheetContent>
          </Sheet>
          <div className='flex  gap-2 items-center ml-auto'>
          <ModeToggle/>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full">
                  <User2  className="size-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  My Account
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/invoices">Invoices</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <form action={
                    async () => {
                      // Inline server action - it runs on server side 
                      "use server";
                      await signOut();
                    } }>
                    <Button variant={"outline"} className='w-full text-left' type="submit">Log Out </Button>
                  </form>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-gradient-to-t from-blue-500 via-teal-500 to-green-500'>
          {children}
        </main>
      </div>
    </div><Toaster /></>
  )
}

export default DashboardLayout;
