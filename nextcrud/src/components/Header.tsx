"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
    const [token, setToken] = useState<boolean>(false); // 👈 track login state

    useEffect(() => {
        const stored = localStorage.getItem("isLogin");
        if (stored) {
            const parsed: boolean = JSON.parse(stored);
            setToken(parsed);
        }
    }, []);


    function resetClick() {
        axios
            .get("/api/user/logout")
            .then((res) => {
                console.log(res.data);
                localStorage.setItem("isLogin", JSON.stringify(false));
                setToken(false); // 👈 update state immediately
                window.location.href = "/users/login";
            })
            .catch((err) => console.log(err));
    }
    // ⛔ Prevent rendering until client-side check completes
    if (token === null) return null;
    return (
        <header className="bg-black text-white p-4 shadow-md">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <h1 className="text-2xl font-bold">
                    <Link href="/">MyCRUD</Link>
                </h1>
                <nav className="space-x-4">
                    {token ? (
                        <>
                            <Link href="/products" className="hover:underline">
                                All Products
                            </Link>
                            <Link href="/products/create" className="hover:underline">
                                Create Product
                            </Link>
                            <span className="hover:underline cursor-pointer" onClick={resetClick}>
                                Logout
                            </span>
                        </>
                    ) : (
                        <>
                            <Link href="/users/login" className="hover:underline">
                                Login
                            </Link>
                            <Link href="/users/signup" className="hover:underline">
                                Signup
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
}
