"use client";

import axios from "axios";
import Link from "next/link";

export default function Header() {
    function resetClick() {
        axios
            .get("/api/user/logout")
            .then((res) => {
                console.log(res.data);
                window.location.href = "/users/login";
            })
            .catch((err) => console.log(err));
    }

    return (
        <header className="bg-black text-white p-4 shadow-md">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <h1 className="text-2xl font-bold">
                    <Link href="/">MyCRUD</Link>
                </h1>
                <nav className="space-x-4">
                    <Link href="/products" className="hover:underline">
                        All Products
                    </Link>
                    <Link href="/products/create" className="hover:underline">
                        Create Product
                    </Link>
                    <Link href="/users/login" className="hover:underline">
                        Login
                    </Link>
                    <Link href="/users/signup" className="hover:underline">
                        Signup
                    </Link>
                    <span className="hover:underline cursor-pointer" onClick={resetClick}>
                        Logout
                    </span>
                </nav>
            </div>
        </header>
    );
}
