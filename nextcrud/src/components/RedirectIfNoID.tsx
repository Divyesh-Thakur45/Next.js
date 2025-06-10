"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RedirectIfNoID() {
    const router = useRouter();

    useEffect(() => {
        const localID = localStorage.getItem("id");
        if (localID) {
            const id = JSON.parse(localID);
            router.replace(`/products/users/${id}`);
        } else {
            router.replace("/users/login");
        }
    }, []);

    return null;
}
