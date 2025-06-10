import axios from "axios";
import { Product, ResponseProduct } from "@/types/Types";
import Image from "next/image";
import Link from "next/link";
import dp from "../../../../../public/defaultimage/cat2.jpg";
import DeleteButton from "../../../../components/DeleteButton";

export default async function ProductPage({ params }: { params: { userID: string } }) {
    let products: Product[] = [];
    // console.log(params.userID)
    try {
        if (params.userID) {
            const res = await axios.get<ResponseProduct>(
                `http://localhost:3000/api/products/all/${params?.userID}`);
            console.log(res.data)
            products = res.data.products;
        }
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
                        <div className="relative w-full h-[200px] mb-3">
                            <Image
                                src={e.image ? e.image : dp}
                                alt="Product Image"
                                fill
                                className="object-cover rounded"
                                sizes="(max-width: 768px) 100vw, 33vw"
                                priority
                            />
                        </div>
                        <h1 className="text-xl font-semibold text-blue-600">{e?.title}</h1>
                        <h2 className="text-gray-600">{e?.price}</h2>
                        <h2 className="text-gray-600">{e?.description}</h2>
                        <div className="flex justify-between">
                            <Link href={`/products/${e?._id}/edit`}>
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
