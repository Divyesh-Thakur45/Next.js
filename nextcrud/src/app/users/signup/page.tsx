"use client";

import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast, { Toaster } from "react-hot-toast";

// Zod schema for validation
const schema = z.object({
    email: z.string().email({ message: "Invalid email address." }),
    password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

type FormData = z.infer<typeof schema>;

export default function SignupPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    // Form submit handler
    const onSubmit = async (data: FormData) => {
        try {
            const res = await axios.post("http://localhost:3000/api/user/signup", data);
            console.log(res.data)
            toast(res.data.message)
            if (res?.data?.success) {
                localStorage.setItem("id", JSON.stringify(res.data.user._id))
                setTimeout(() => {
                    window.location.href = `/products/users/${res.data.user._id}`;
                }, 1000);
                localStorage.setItem("isLogin", JSON.stringify(res?.data?.success))
                const loginRes = await axios.post("http://localhost:3000/api/user/login", data);
                if (loginRes?.data?.success) {
                    toast.success("Signup Successfully 🎉")

                }
            } else {
                localStorage.setItem("isLogin", JSON.stringify(res?.data?.success))
            }
        } catch (err) {
            console.error("Signup error:", err);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <Toaster position="top-right" />
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold mb-6 text-center">Create an Account</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Email Input */}
                    <div>
                        <input
                            type="email"
                            {...register("email")}
                            placeholder="Email Address"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    {/* Password Input */}
                    <div>
                        <input
                            type="password"
                            {...register("password")}
                            placeholder="Password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md"
                    >
                        Sign Up
                    </button>
                </form>

                <p className="mt-4 text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <a href="/users/login" className="text-blue-600 hover:underline">
                        Log in
                    </a>
                </p>
            </div>
        </div>
    );
}
