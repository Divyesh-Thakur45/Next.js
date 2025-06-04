import { Product, resProduct } from "@/types/AllType";
import axios from "axios";
import Link from "next/link";
import DeleteButton from "./DeleteButton";

export default async function ProductPage() {
    let products: Product[] = [];

    try {
        const res = await axios.get<resProduct>("http://localhost:3000/api/products");
        products = res.data.products;
        console.log(products)
    } catch (error) {
        console.error("Error fetching products:", error);
    }

    return (
        <div className="max-w-5xl mx-auto p-4 font-sans">
            <h1 className="text-3xl font-bold mb-6 text-center text-white">All Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {products.map((e, idx) => (
                    <div
                        key={idx}
                        className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-all duration-200"
                    >
                        <h1 className="text-xl font-semibold text-blue-600">{e.title}</h1>
                        <h2 className="text-gray-600">{e.price}</h2>
                        <h2 className="text-gray-600">{e.description}</h2>
                        <div className="flex justify-between">
                            <Link href={`/products/${e._id}/edit`}>
                                <button className="text-green-400 border px-[18px] rounded hover:bg-green-400 hover:text-white">
                                    Update
                                </button>
                            </Link>
                            <DeleteButton id={e._id} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
