"use client";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cart, cartResponse } from "@/types/type";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Addtocard() {
    const [data, setData] = useState<cart[]>([]);
    const [isShow, setisShow] = useState<boolean>(false)
    const handleDelete = (id: string) => {
        axios.delete(`http://localhost:3000/api/addtocart/${id}`)

    }
    useEffect(() => {
        const id = JSON.parse(localStorage.getItem("id") as string);
        if (id) {
            axios
                .get<cartResponse>(`http://localhost:3000/api/addtocart/${id}`)
                .then((res) => {
                    setData(res?.data?.cartData)
                    setisShow(res?.data?.success)
                })
                .catch((err) => console.log(err));
        } else {
            setData([]); // fallback value
        }
    }, []);

    return (
        <div>
            <Table>
                <TableCaption>Add to cart data</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[200px]">Image</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead className="text-right">Functionality</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isShow ? (<>
                        {data.map((invoice: cart, idx: number) => (
                            <TableRow key={idx}>
                                <TableCell className="font-medium">
                                    {invoice.image && (
                                        <Image
                                            src={invoice.image}
                                            alt={invoice.name}
                                            width={100}
                                            height={100}
                                            className="rounded-full object-cover"
                                        />
                                    )}
                                </TableCell>
                                <TableCell>{invoice.name}</TableCell>
                                <TableCell>{invoice.price}</TableCell>
                                <TableCell className="text-right">
                                    <Button onClick={() => handleDelete(invoice._id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </>) : (<><h1>You do not have data </h1></>)}

                </TableBody>
            </Table>
        </div>
    );
}
