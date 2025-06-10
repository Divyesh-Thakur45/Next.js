"use client";

import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

type Props = {
    id: string;
};

export default function DeleteButton({ id }: Props) {
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        });

        if (result.isConfirmed) {
            setLoading(true);
            try {
                await axios.delete(`http://localhost:3000/api/products/${id}`);
                Swal.fire({
                    title: "Deleted!",
                    text: "Your product has been deleted.",
                    icon: "success",
                }).then(() => {
                    window.location.reload();
                });
            } catch (error) {
                console.error("Delete failed:", error);
                Swal.fire("Error", "Something went wrong while deleting.", "error");
            }
            setLoading(false);
        }
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
