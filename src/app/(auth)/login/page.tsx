
'use client'
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from "react-hook-form";
import { useState } from "react";

const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

export const loginSchema = z
  .object({
    email: z.string().email({ message: "Invalid email address" }),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        passwordRegex,
        "Password must include at least one letter, one number, and one special character"
      ),
    comfiermPassword: z
      .string()
      .min(8, "Confirm Password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.comfiermPassword, {
    message:
      "Passwords do not match. Please make sure both passwords are identical.",
    path: ["comfiermPassword"],
  });

type FormValues = z.infer<typeof loginSchema>;
export default function LoginPage() {
  const form = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      comfiermPassword: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Login</h1>
      <form onSubmit={form.handleSubmit((data) => console.log(data))} className="space-y-4">
        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            type="email"
            {...form.register("email")}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2"
          />
          {form.formState.errors.email && (
            <p className="text-red-600 text-sm mt-1">{form.formState.errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            {...form.register("password")}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-sm text-blue-600 hover:underline mt-1"
          >
            {showPassword ? "Hide Password" : "Show Password"}
          </button>
          {form.formState.errors.password && (
            <p className="text-red-600 text-sm mt-1">{form.formState.errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
          <input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            {...form.register("comfiermPassword")}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="text-sm text-blue-600 hover:underline mt-1"
          >
            {showConfirmPassword ? "Hide Password" : "Show Password"}
          </button>
          {form.formState.errors.comfiermPassword && (
            <p className="text-red-600 text-sm mt-1">{form.formState.errors.comfiermPassword.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}
