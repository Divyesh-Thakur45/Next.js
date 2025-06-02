"use client";
import { useState } from "react"

export default function Product() {

    setTimeout(() => {
    }, 1000);
    const [Input, setInput] = useState<string>("")
    return (
        <div>
            <h1>Product page</h1>
            <input type="text" value={Input} onChange={(e) => setInput(e.target.value)} name="" id="" />
            <h1>{Input}</h1>
        </div>
    )
}

