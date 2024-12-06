import { Button } from '@/components/ui/button';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { CheckCircle, DownloadCloudIcon, Edit2, MailIcon, MoreHorizontal, Trash } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

const InvoiceActions = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size={"icon"} variant={"secondary"}>
                    <MoreHorizontal className='size-4' />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className='text-green-400 bg-green-50'>
                <DropdownMenuItem asChild>
                    <Link href="edit"> <Edit2 />Edit Invoice</Link>

                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="download"> <DownloadCloudIcon />  DownLoad Invoice </Link>

                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="download"> <MailIcon /> Reminder Email </Link>

                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="download"> <Trash /> Delete Invoice</Link>

                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="paid"> <CheckCircle /> Mark as Paid </Link>

                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default InvoiceActions;
