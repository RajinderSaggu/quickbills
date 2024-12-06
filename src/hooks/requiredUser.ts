import { auth } from "@/utils/auth";
import { redirect } from "next/navigation";

export async function requiredUser() {
    const session = await auth();

    if(!session?.user){
        redirect("/login");
    }
    return session;
};