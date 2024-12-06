import { SharedTable } from '@/app/components/table';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import InvoiceList from './_components/invoice-list';


const InvoicesRoute = () => {
    return (
        <Card>
            <CardHeader>
                <div className='flex justify-between items-center'>
                    <div>
                        <CardTitle className='text-2xl font-bold'>Invoices</CardTitle>
                        <CardDescription>Manage your invoices right here</CardDescription>
                    </div>
                    <Link href="/" className={buttonVariants()}>

                        Create Invoice <PlusIcon />

                    </Link>
                </div>
            </CardHeader>
            <CardContent>
              <InvoiceList/>
            </CardContent>
        </Card>
    )
}

export default InvoicesRoute;
