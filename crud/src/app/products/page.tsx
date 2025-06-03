"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import type { Product, resProduct } from "../../../Types/Product";
import Link from "next/link";

export default function Product() {
    const [data, setData] = useState<Product[]>([]);
    const handleDelete = (id: number) => {
        // alert(id)
        axios.delete(`http://localhost:3000/api/products/${id}`).then((res) => {
            console.log(res.data);
            showData()
        })
            .catch((err) => console.error(err.message))
    }
    const showData = () => {
        axios
            .get<resProduct>("http://localhost:3000/api/products")
            .then((res) => setData(res.data.products))
            .catch((err) => console.error(err.message));
    }
    useEffect(() => {
        showData()
    }, []);

    return (
        <div className="max-w-5xl mx-auto p-4 font-sans">
            <h1 className="text-3xl font-bold mb-6 text-center text-white">All Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {data.map((e, idx) => (
                    <div
                        key={idx}
                        className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-all duration-200"
                    >
                        <h1 className="text-xl font-semibold text-blue-600">{e.name}</h1>
                        <h2 className="text-gray-600">{e.stream}</h2>
                        <div className="flex justify-between">
                            <Link href={`/products/${e.id}/edit`}><button className="text-green-400 border px-[18px] rounded hover:bg-green-400 hover:text-white">Update</button></Link>
                            <button className="text-red-400 border px-[18px] rounded hover:bg-red-400 hover:text-white" onClick={() => handleDelete(e.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>


    );
}
