"use client";

import axios from "axios";
// import { useRouter } from "next/router";
import { useState } from "react";

type Props = {
    id: string;
};

export default function DeleteButton({ id }: Props) {
    const [loading, setLoading] = useState(false);
    // const router = useRouter()

    const handleDelete = async () => {
        setLoading(true);
        try {
            await axios.delete(`http://localhost:3000/api/products/${id}`);
            window.location.reload();
        } catch (error) {
            console.error("Delete failed:", error);
        }
        setLoading(false);
    };

    return (
        <button
            disabled={loading}
            className="text-red-400 border px-[18px] rounded hover:bg-red-400 hover:text-white"
            onClick={handleDelete}
        >
            {loading ? "Deleting..." : "Delete"}
        </button>
    );
}
