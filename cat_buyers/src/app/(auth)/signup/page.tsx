"use client";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod/v4";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from "next/link";
import axios from "axios";

export default function Signup() {
    const schema = z.object({
        email: z.string()
            .nonempty("Email is required")
            .endsWith("@gmail.com", "Only Gmail allowed"),
        password: z.string()
            .nonempty("Password is required")
            .min(6, "Password must be at least 6 characters"),
        conformPassword: z.string()
            .nonempty("Confirm password is required")
            .min(6, "Must be at least 6 characters"),
    }).refine((data) => data.password === data.conformPassword, {
        message: "Passwords do not match",
        path: ["conformPassword"],
    });
    type schemaType = z.infer<typeof schema>
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<schemaType>({
        resolver: zodResolver(schema),
    });
    async function clickSubmit(data: schemaType) {
        const { email, password } = data
        const isSignup = await axios.post("http://localhost:3000/api/users/signup", { email, password });
        if (isSignup.data.success) {
            const isTrue = await axios.post("http://localhost:3000/api/users/login", { email, password });
            if (isTrue.data.success) {
                localStorage.setItem("id", JSON.stringify(isTrue.data.userID))
                localStorage.setItem("toggle", JSON.stringify(isTrue.data.success))
                alert("Signup successfully")
                window.location.href = "/"
            }
        }
        reset()
    }
    return (
        <div>
            <div className="">
                <form onSubmit={handleSubmit(clickSubmit)}>
                    <Card className="w-full max-w-sm mx-auto my-[60px]">
                        <CardHeader>
                            <CardTitle>Signup to your account</CardTitle>
                            <CardDescription>
                                Enter your email below to signup to your account
                            </CardDescription>
                            <CardAction>
                                <Button variant="link">
                                    <Link href={"/login"}>Login</Link>
                                </Button>
                            </CardAction>
                        </CardHeader>
                        <CardContent>

                            <div className="flex flex-col gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        {...register("email")}
                                        id="email"
                                        type="email"
                                        placeholder="xyz@gamil.com"
                                    />
                                    {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                                </div>
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="password">Password</Label>
                                    </div>
                                    <Input  {...register("password")} id="password" type="password" />
                                    {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                                </div>
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="password">Conform Password</Label>
                                    </div>
                                    <Input  {...register("conformPassword")} id="conform-password" type="password" />
                                    {errors.conformPassword && <p className="text-red-500">{errors.conformPassword.message}</p>}
                                </div>
                            </div>

                        </CardContent>
                        <CardFooter className="flex-col gap-2">
                            <Button type="submit" className="w-full">
                                Signup
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </div >
    )
}


