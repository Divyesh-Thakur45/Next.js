"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Zod schema
const schema = z.object({
    title: z.string().min(1, "Title is required"),
    price: z.string().min(1, "Price is required"),
    description: z.string().min(1, "Description is required"),
});

type FormData = z.infer<typeof schema>;

export default function Createproducts() {
    const router = useRouter();
    const [file, setFile] = useState<File | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data: FormData) => {

        const formData = new FormData();
        if (file) {
            formData.append("image", file);
        }
        formData.append("title", data.title);
        formData.append("price", data.price);
        formData.append("description", data.description);

        try {
            const res = await axios.post("http://localhost:3000/api/products", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (res.data.success) {
                router.push("/products");
            }
        } catch (err) {
            console.error("Upload failed:", err);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg space-y-4 my-[200px]"
        >
            <h2 className="text-2xl font-bold text-center text-gray-800">Add Product</h2>

            {/* Image Upload */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                <input
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    type="file"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Title */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                    type="text"
                    {...register("title")}
                    placeholder="Enter title"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
            </div>

            {/* Price */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                <input
                    type="text"
                    {...register("price")}
                    placeholder="Enter price"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
            </div>

            {/* Description */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <input
                    type="text"
                    {...register("description")}
                    placeholder="Enter description"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
                Submit
            </button>
        </form>
    );
}
