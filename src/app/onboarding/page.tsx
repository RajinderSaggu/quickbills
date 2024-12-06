"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { useActionState } from 'react'
import SubmitButton from '../components/submit-button';
import { onboardUser } from '../axtions';
import { useForm } from "@conform-to/react";
import { onboardingSchema } from '@/utils/zodSchemas';
import { parseWithZod } from '@conform-to/zod';

const OnBoarding = () => {
    const [lastResult, action] = useActionState(onboardUser, undefined);
    //useForm hook has client side state and lastResult has server side state
    const [form, fields] = useForm({
        lastResult,
        onValidate({ formData }) {
            return parseWithZod(formData, {
                schema: onboardingSchema
            });
        },
        shouldValidate: "onBlur",
        shouldRevalidate: "onInput",
    })
    return (
        <div className='min-h-screen w-screen flex items-center justify-center  '>
            <Card>
                <CardHeader>
                    <CardTitle className='text-xl'>
                        You are Almost Finished
                    </CardTitle>
                    <CardDescription>Enter your general info to get started !</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className='grid gap-4' action={action} id={form.id} onSubmit={form.onSubmit}>
                        <div className='flex gap-2 '>
                            <div className='grid gap-2'>
                                <Label>
                                    First Name
                                </Label>
                                <Input
                                    name={fields.firstName.name}
                                    defaultValue={fields.firstName.initialValue}
                                    key={fields.firstName.key}
                                    placeholder='Harry' />
                                    <p className='text-sm text-red-800'>{fields.firstName.errors}</p>
                            </div>
                            <div className='grid gap-2 '>
                                <Label>
                                    Last Name
                                </Label>
                                <Input
                                    name={fields.lastName.name}
                                    defaultValue={fields.lastName.initialValue}
                                    key={fields.lastName.key}
                                    placeholder='Peter' />
                                      <p className='text-sm text-red-800'>{fields.lastName.errors}</p>
                            </div>
                        </div>
                        <div className='grid gap-2'>
                            <Label>
                                Address
                            </Label>
                            <Input
                                name={fields.address.name}
                                defaultValue={fields.address.initialValue}
                                key={fields.address.key}
                                placeholder='chad street 1234'/>
                                  <p className='text-sm text-red-800'>{fields.address.errors}</p>
                        </div>
                        <SubmitButton text="Finished OnBoarding" />
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default OnBoarding;
