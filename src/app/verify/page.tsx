import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, ArrowLeft, Mail } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

const Verify = () => {
    return (
        <div className='min-h-screen w-full flex items-center justify-center'>
            <Card className='w-[380px] px-5'>
                <CardHeader className='text-center'>
                    <div className='mb-4 mx-auto flex size-20 items-center justify-center rounded-full bg-blue-100 '>
                        <Mail />
                    </div>
                    <CardTitle>
                        Check your Email
                    </CardTitle>
                    <CardDescription>
                        We have sent a verification link to your email address.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className='mt-4 rounded-md bg-yellow-50 border-yellow-300 p-4 '>
                        <div className='flex items-center'>
                            <AlertCircle className='size-5 text-yellow-500 mr-2' />
                            <p className='text-sm font-medium text-yellow-500'>
                                Be sure to check your spam folder!
                            </p>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>

                    <Link href="/login" className={buttonVariants({
                        className: "w-full",
                        variant: "outline",
                    })}>
                        <ArrowLeft className='size-4 mr-2' />
                        Back to Homepage</Link>

                </CardFooter>
            </Card>
        </div>
    )
}

export default Verify;
