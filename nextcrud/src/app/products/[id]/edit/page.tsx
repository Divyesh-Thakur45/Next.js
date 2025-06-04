"use client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Createproducts() {
    const router = useRouter()
    const { id } = useParams()
    const [title, setTitle] = useState<string>("")
    const [price, setPirce] = useState<string>("")
    const [description, setdescription] = useState<string>("")
    const HandleUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        axios.patch(`http://localhost:3000/api/products/${id}`, { title, price, description }).then((res) => {
            console.log(res.data);
            router.push("/products");
        })
            .catch((err) => console.error(err.message))
    }
    useEffect(() => {
        axios.get(`http://localhost:3000/api/products/${id}`).then((res) => {
            console.log(res.data.product);
            setTitle(res.data.product.title);
            setPirce(res.data.product.price);
            setdescription(res.data.product.description);
        })
            .catch((err) => console.log(err.message))
    }, [id])
    return (
        <form className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg space-y-4 my-[200px]">
            <h2 className="text-2xl font-bold text-center text-gray-800">Add Name & Stream</h2>

            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    title
                </label>
                <input
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Enter title"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                    price
                </label>
                <input
                    onChange={(e) => setPirce(e.target.value)}
                    value={price}
                    type="text"
                    id="price"
                    name="price"
                    placeholder="Enter price"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    description
                </label>
                <input
                    onChange={(e) => setdescription(e.target.value)}
                    value={description}
                    type="text"
                    id="description"
                    name="description"
                    placeholder="Enter description"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <button
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => HandleUpdate(e)
                }
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
                update
            </button >
        </form >

    )
}