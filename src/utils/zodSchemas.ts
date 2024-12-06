import {z} from "zod";
export const onboardingSchema = z.object({
    firstName: z.string().min(2, "first name is required"),
    lastName: z.string().min(2, "last name is required"), 
    address: z.string().min(2 , "Address is required"), 
});