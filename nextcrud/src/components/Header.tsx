import Link from "next/link";

export default function Header() {
    return (
        <header className="bg-black text-white p-4 shadow-md">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <h1 className="text-2xl font-bold">
                    <Link href="/">MyCRUD</Link>
                </h1>
                <nav className="space-x-4">
                    <Link href="/products" className="hover:underline">
                        All Products
                    </Link>
                    <Link href="/products/create" className="hover:underline">
                        Create Product
                    </Link>
                </nav>
            </div>
        </header>
    );
}
