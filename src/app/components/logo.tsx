import React from 'react'
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
    return (

        <Link href="/" className="flex items-center gap-2">
            <Image src={"/logo.jpg"} alt="Logo" className="size-10" width={80} height={80} />
            <h3 className="text-3xl font-semibold font-sans">
                Quick
                <span className="ml-1 bg-gradient-to-l from-blue-500 via-teal-500 to-green-500 text-transparent bg-clip-text">
                    Bills
                </span>
            </h3>
        </Link>

    )
}

export default Logo;
