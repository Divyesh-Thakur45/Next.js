import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 py-6 mt-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
                <p className="text-sm">&copy; {new Date().getFullYear()} MyApp. All rights reserved.</p>

                <ul className="flex space-x-6 mt-4 md:mt-0 text-sm">
                    <li><Link href="/about" className="hover:text-white">About</Link></li>
                    <li><Link href="/docs" className="hover:text-white">Docs</Link></li>
                    <li><Link href="/product" className="hover:text-white">Product</Link></li>
                    <li><Link href="/login" className="hover:text-white">Login</Link></li>
                    <li><Link href="/signup" className="hover:text-white">Signup</Link></li>
                </ul>
            </div>
        </footer>
    );
}
