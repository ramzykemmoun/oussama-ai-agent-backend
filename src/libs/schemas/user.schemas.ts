import z from "zod";

export const userSchema = z.object({
    name: z.string().min(1, "Name is required"),
    lastname: z.string().min(1, "Last name is required"),
    email: z.email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export type UserFieldValues = z.infer<typeof userSchema>