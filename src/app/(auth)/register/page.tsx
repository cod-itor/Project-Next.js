'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

// Simple eye icons (replace with your icon library if needed)
function EyeIcon({ className = "" }: { className?: string }) {
    return (
        <svg className={className} width="20" height="20" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeWidth="2" d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Z" />
            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
        </svg>
    )
}
function EyeOffIcon({ className = "" }: { className?: string }) {
    return (
        <svg className={className} width="20" height="20" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeWidth="2" d="M3 3l18 18M10.7 6.3A9.77 9.77 0 0 1 12 5c7 0 11 7 11 7a19.7 19.7 0 0 1-5.1 6.1M6.1 6.1A19.7 19.7 0 0 0 1 12s4 7 11 7a9.77 9.77 0 0 0 5.7-1.7" />
            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
        </svg>
    )
}

const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

const formSchema = z.object({
    username: z
        .string()
        .min(3, "Username must be at least 3 characters")
        .max(20, "Username must be at most 20 characters")
        .regex(usernameRegex, "Username can contain letters, numbers, and underscores only"),
    email: z
        .string()
        .email("Invalid email address"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(passwordRegex, "Password must include at least one letter, one number, and one special character"),
    confirmPassword: z
        .string()
        .min(8, "Confirm Password must be at least 8 characters")
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match. Please make sure both passwords are identical.",
    path: ["confirmPassword"],
})

type FormValues = z.infer<typeof formSchema>

export default function Page() {
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    })

    // State for password visibility
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    function onSubmit(data: FormValues) {
        // handle form submission
        console.log(data)
    }

    return (
        <Card className="max-w-md mx-auto mt-10">
            <CardHeader>
                <CardTitle>Register</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        {/* username fields */}
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Your name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* email fields */}
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="you@example.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* password fields */}
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                type={showPassword ? "text" : "password"}
                                                placeholder="********"
                                                {...field}
                                            />
                                            <button
                                                type="button"
                                                tabIndex={-1}
                                                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-500"
                                                onClick={() => setShowPassword((v) => !v)}
                                                aria-label={showPassword ? "Hide password" : "Show password"}
                                            >
                                                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                                            </button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* confirm password fields */}
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                type={showConfirmPassword ? "text" : "password"}
                                                placeholder="********"
                                                {...field}
                                            />
                                            <button
                                                type="button"
                                                tabIndex={-1}
                                                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-500"
                                                onClick={() => setShowConfirmPassword((v) => !v)}
                                                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                                            >
                                                {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                                            </button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full">Register</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
