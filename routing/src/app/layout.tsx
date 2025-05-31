// app/layout.js

import React from "react";
import type { Metadata } from 'next'

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
            <body>{children}</body>
        </html>
    );
}
