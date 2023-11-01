import * as z from "zod";

export const SignupValidation = z.object({
    name: z.string().min(6, {message: "Too short"}),
    username: z.string().min(6, {message: "Too short"}),
    email: z.string().email(),
    password: z.string().min(8, {message: "password must at least be 8 characters"}),
})