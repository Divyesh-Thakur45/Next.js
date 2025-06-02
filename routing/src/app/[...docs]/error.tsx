"use client";

import { useEffect } from "react";

export default function Errorhandle({ error, reset }: { error: Error; reset: () => void; }) {
    useEffect(() => {
        console.log("Error caught : ", error)
    }, [error])
    return (
        <div>
            <div style={{ padding: "20px", color: "red", textAlign: "center" }}>
                <h2>Oops! Something went wrong 😓</h2>
                <p>{error.message}</p>
                <button
                    onClick={() => reset()}
                    style={{ marginTop: "10px", padding: "8px 16px", background: "black", color: "white", border: "1px solid white" }}
                >
                    Try again
                </button>
            </div>
        </div>
    )
}