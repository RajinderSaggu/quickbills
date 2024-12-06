"use client";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

interface SubmitButtonProps {
text: string;
}
const SubmitButton =  ({text} : SubmitButtonProps )  => {
    const { pending } = useFormStatus();
    return (
        <>
            {pending ? (
                <Button disabled  type="submit" className="w-full">
                    <Loader2 className="size-4 animate-spin" /> Please wait...
                </Button>
            ) :
                <Button type="submit" className="w-full">
                    {text}
                </Button>

            }
        </>
    )
}
export default SubmitButton;