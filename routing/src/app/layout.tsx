// app/layout.js
import "./gloabal.css"
import React from "react";
import type { Metadata } from 'next'
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";

export const metadata: Metadata = {
    title: 'Learning the next',
    description: 'Generated layout',
};
type childrenProps = {
    children: React.ReactNode
}
export default function RootLayout({ children }: childrenProps) {
    return (
        <html lang="en">
            <body className="flex flex-col min-h-screen">
                <Navigation />
                <main className="flex-grow">{children}</main>
                <Footer />
            </body>
        </html>
    );
}
