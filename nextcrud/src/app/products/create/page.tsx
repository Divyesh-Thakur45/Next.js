"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Createproducts() {
    const router = useRouter()
    const [file, setfile] = useState<File | null | string>("")
    const [title, setTitle] = useState<string>("")
    const [price, setPrice] = useState<string>("")
    const [description, setdescription] = useState<string>("")
    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!title || !price || !description) {
            alert("All fields including image are required!");
            return;
        }
        const data = new FormData();
        if (file) {
            data.append("image", file);
        }
        data.append("title", title);
        data.append("price", price);
        data.append("description", description);

        axios.post("http://localhost:3000/api/products", data, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }).then((res) => {
            console.log(res.data);
            router.push("/products");
        })
            .catch((err) => console.error(err.message))
    }
    return (
        <form className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg space-y-4 my-[200px]">
            <h2 className="text-2xl font-bold text-center text-gray-800">Add Name & Stream</h2>
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    image
                </label>
                <input
                    onChange={(e) => setfile(e.target.files?.[0] || null)}
                    type="file"
                    id="file"
                    name="file"
                    placeholder="Select image"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    title
                </label>
                <input
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div>
                <label htmlFor="stream" className="block text-sm font-medium text-gray-700 mb-1">
                    price
                </label>
                <input
                    onChange={(e) => setPrice(e.target.value)}
                    type="text"
                    id="stream"
                    name="stream"
                    placeholder="Enter stream"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>
                <label htmlFor="stream" className="block text-sm font-medium text-gray-700 mb-1">
                    description
                </label>
                <input
                    onChange={(e) => setdescription(e.target.value)}
                    type="text"
                    id="stream"
                    name="stream"
                    placeholder="Enter stream"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <button
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleSubmit(e)
                }
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
                Submit
            </button >
        </form >

    )
}