"use client";
import { dashboardLinks } from '@/constant/dashboard-links';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const DashboardLinks = () => {
    const pathname = usePathname();
    return (
        <>
            {dashboardLinks?.map((link) => (
                <Link
                    className={cn(
                        pathname === link.href
                            ? "text-primary bg-primary/10"
                            : "text-muted-foreground hover:text-foreground",
                        "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-teal-500"
                    )}
                    href={link?.href}
                    key={link?.id}
                >

                 <link.icon className='size-4' />
                    {link?.name}
                </Link>
            ))}
        </>
    );
};

export default DashboardLinks;
