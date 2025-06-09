"use client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import dp from "../../../../../public/defaultimage/cat2.jpg";
import Image from "next/image";

export default function Createproducts() {
    const router = useRouter();
    const { id } = useParams();

    const [flag, setFlag] = useState<string>("false");
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>("");
    console.log(previewUrl)
    const [title, setTitle] = useState<string>("");
    const [price, setPrice] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    // 👇 Fetch product
    useEffect(() => {
        axios
            .get(`http://localhost:3000/api/products/${id}`)
            .then((res) => {
                const product = res.data?.product;
                setPreviewUrl(product?.image || "");
                setTitle(product?.title || "");
                setPrice(product?.price || "");
                setDescription(product?.description || "");
            })
            .catch((err) => console.error(err.message));
    }, [id]);

    // 👇 Submit handler
    const handleUpdate = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const data = new FormData();
        if (file) {
            data.append("image", file);
        }
        data.append("flag", flag);
        data.append("title", title);
        data.append("price", price);
        data.append("description", description);

        try {
            const res = await axios.patch(
                `http://localhost:3000/api/products/${id}`,
                data
            );
            console.log(res.data);
            router.push("/products");
        } catch (err) {
            console.error("Update error:", err);
        }
    };

    // 👇 File input handler
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreviewUrl(URL.createObjectURL(selectedFile));
        }
    };

    // 👇 Image remove handler
    const handleRemoveImage = () => {
        setFile(null);
        setPreviewUrl("");
        setFlag("true"); // Important for backend
    };

    return (
        <form className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg space-y-4 my-[200px]">
            <h2 className="text-2xl font-bold text-center text-gray-800">
                Update Product
            </h2>

            {/* IMAGE UPLOAD */}
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

                    {/* Hidden file input */}
                    <input
                        type="file"
                        id="fileInput"
                        onChange={handleFileChange}
                        className="hidden"
                    />

                    {/* Custom label as button */}
                    <label
                        htmlFor="fileInput"
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md cursor-pointer hover:bg-gray-300"
                    >
                        Choose File
                    </label>

                    {/* Show file name or default text */}
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

            {/* TITLE */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                </label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter title"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
            </div>

            {/* PRICE */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price
                </label>
                <input
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Enter price"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
            </div>

            {/* DESCRIPTION */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                </label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter description"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
            </div>

            {/* SUBMIT BUTTON */}
            <button
                onClick={handleUpdate}
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
                Update
            </button>
        </form>
    );
}
