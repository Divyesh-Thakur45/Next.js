"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
    const [token, setToken] = useState<boolean>(false); // 👈 track login state
    const [userID, setuserID] = useState<string>("")
    useEffect(() => {
        const id = localStorage.getItem("id")
        const stored = localStorage.getItem("isLogin");
        if (stored && id) {
            const parsed: boolean = JSON.parse(stored);
            setToken(parsed);
            const idParsed: string = JSON.parse(id)
            setuserID(idParsed)
        }
    }, []);


    function resetClick() {
        axios
            .get("/api/user/logout")
            .then(() => {
                localStorage.removeItem("id")
                localStorage.removeItem("isLogin")
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
                            <Link href={`/products/users/${userID}`} className="hover:underline">
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
