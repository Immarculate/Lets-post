import React from 'react';
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import {
    Form,
    FormControl,
    // FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { SignupValidation } from '@/lib/validation';
import { z } from "zod";
import Loader from '@/components/shared/Loader';
// import { createUserAccount } from '@/lib/appwrite/api';
import { useToast } from "@/components/ui/use-toast"
import { useCreateUserAccount, useSignInAccount } from '@/lib/react-query/queriesandmutations';
import { useUserContext } from '@/context/authContext';



const SignupForm = () => {
    // const isLoading = false;
    const { toast } = useToast()
    const navigate = useNavigate();
    const { checkAuthUser, isLoading, isUserLoading } = useUserContext();

    const { mutateAsync: createUserAccount, isPending: isCreatingAccount } = useCreateUserAccount();

    const { mutateAsync: signInAccount, isPending: isSignIn } = useSignInAccount();

    // 1. Define your form.
    const form = useForm<z.infer<typeof SignupValidation>>({
        resolver: zodResolver(SignupValidation),
        defaultValues: {
            name: "",
            username: "",
            email: "",
            password: "",
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof SignupValidation>) {
        // Do something with the form values.
        const newUser = await createUserAccount(values);
        if (!newUser) {
            return toast({
                title: 'already have an account, please try sign in.'
            })
        }

        const session = await signInAccount({
            email: values.email,
            password: values.password,
        })
        if(!session) {
            return toast({
                title: 'sign in failed, please try again.'
            })
        }
        const isLoggedIn = await checkAuthUser();
  
        if(isLoggedIn) {
            form.reset();
            navigate('/');
        } else {
            return toast({
                title: 'sign up failed, please try again.'
            })
        }
        // ✅ This will be type-safe and validated.
        console.log(newUser);
    }


    return (
        <Form {...form}>
            <div className='sm:w-420 flex-center flex-col'>
                {/* <img src='/Assets/images/logo.svg' alt='logo' /> */}
                <h2 className='h3-bold md:h2-bold pt-0 sm:pt-10'>Sign up with let's post</h2>
                <p className='text-light-3 small-medium md:base-regular mt-2'>To use let's post,enter your details</p>

                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input type="text" className='shad-input' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>UserName</FormLabel>
                                <FormControl>
                                    <Input type="text" className='shad-input' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type="email" className='shad-input' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" className='shad-input' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className='shad-button_primary'>
                        {isCreatingAccount ? (
                            <div className='flex-center gap-2'> <Loader />Loading....</div>
                        ) : "sign up"}
                    </Button>
                    <p className='mt-2 flex-center tex-light-2 text-small-regular'>
                        Already have an account ?,
                        <Link to='./Sign-in' className="text-primary-500 text-small-semibold ml-1"> Log in.</Link>
                    </p>
                </form>
            </div>

        </Form>
    )
}

export default SignupForm;