import Link from "next/link";

export default function Navigation() {
    return (
        <div>
            <nav className="bg-gray-900 text-white p-4 shadow-md">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="text-xl font-bold">
                        <Link href="/">MyApp</Link>
                    </div>
                    <ul className="flex gap-6 text-sm font-medium">
                        <li>
                            <Link href="/login" className="hover:text-gray-300">Login</Link>
                        </li>
                        <li>
                            <Link href="/signup" className="hover:text-gray-300">Signup</Link>
                        </li>
                        <li>
                            <Link href="/docs" className="hover:text-gray-300">Docs</Link>
                        </li>
                        <li>
                            <Link href="/about" className="hover:text-gray-300">About</Link>
                        </li>
                        <li>
                            <Link href="/product" className="hover:text-gray-300">Product</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

