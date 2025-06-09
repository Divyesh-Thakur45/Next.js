"use client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import dp from "../../../../../public/defaultimage/cat2.jpg";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// ✅ Zod Schema
const productSchema = z.object({
    title: z.string().min(1, "Title is required"),
    price: z.string().min(1, "Price is required"),
    description: z.string().min(1, "Description is required"),
});

type ProductFormData = z.infer<typeof productSchema>;

export default function Createproducts() {
    const router = useRouter();
    const { id } = useParams();

    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>("");
    const [flag, setFlag] = useState<string>("false");

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<ProductFormData>({
        resolver: zodResolver(productSchema),
    });

    // ✅ Fetch product and prefill form
    useEffect(() => {
        axios
            .get(`http://localhost:3000/api/products/${id}`)
            .then((res) => {
                const product = res.data?.product;
                setPreviewUrl(product?.image || "");
                setValue("title", product?.title || "");
                setValue("price", product?.price || "");
                setValue("description", product?.description || "");
            })
            .catch((err) => console.error(err.message));
    }, [id, setValue]);

    // ✅ File Change
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreviewUrl(URL.createObjectURL(selectedFile));
        }
    };

    // ✅ Remove Image
    const handleRemoveImage = () => {
        setFile(null);
        setPreviewUrl("");
        setFlag("true");
    };

    // ✅ Submit Handler
    const onSubmit = async (data: ProductFormData) => {
        const formData = new FormData();

        if (file) {
            formData.append("image", file);
        }
        formData.append("flag", flag);
        formData.append("title", data.title);
        formData.append("price", data.price);
        formData.append("description", data.description);

        try {
            const res = await axios.patch(
                `http://localhost:3000/api/products/${id}`,
                formData
            );
            console.log(res.data);
            router.push("/products");
        } catch (err) {
            console.error("Update error:", err);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg space-y-4 my-[200px]"
        >
            <h2 className="text-2xl font-bold text-center text-gray-800">
                Update Product
            </h2>

            {/* Image Upload */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image
                </label>
                <div className="flex items-center gap-4">
                    <div className="h-[50px] w-[50px] relative">
                        <Image
                            src={previewUrl || dp}
                            alt="Preview"
                            fill
                            className="rounded-full object-cover"
                        />
                    </div>

                    <input
                        type="file"
                        id="fileInput"
                        onChange={handleFileChange}
                        className="hidden"
                    />

                    <label
                        htmlFor="fileInput"
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md cursor-pointer hover:bg-gray-300"
                    >
                        Choose File
                    </label>

                    <span className="text-sm text-gray-600 max-w-[120px] truncate">
                        {previewUrl ? previewUrl : "No file chosen"}
                    </span>

                    {previewUrl && (
                        <span
                            onClick={handleRemoveImage}
                            className="text-red-500 cursor-pointer"
                        >
                            ❌
                        </span>
                    )}
                </div>
            </div>

            {/* Title */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                </label>
                <input
                    type="text"
                    {...register("title")}
                    placeholder="Enter title"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
                {errors.title && (
                    <p className="text-red-500 text-sm">{errors.title.message}</p>
                )}
            </div>

            {/* Price */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price
                </label>
                <input
                    type="text"
                    {...register("price")}
                    placeholder="Enter price"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
                {errors.price && (
                    <p className="text-red-500 text-sm">{errors.price.message}</p>
                )}
            </div>

            {/* Description */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                </label>
                <input
                    type="text"
                    {...register("description")}
                    placeholder="Enter description"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
                {errors.description && (
                    <p className="text-red-500 text-sm">{errors.description.message}</p>
                )}
            </div>

            {/* Submit */}
            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
                Update
            </button>
        </form>
    );
}
