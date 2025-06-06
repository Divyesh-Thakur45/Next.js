import connectDB from "@/_lib/mongodb"
import productModel from "@/models/Product"
import { NextRequest, NextResponse } from "next/server"


// GET function for get all products
export async function GET() {
    try {
        await connectDB()
        const data = await productModel.find()
        return NextResponse.json({
            status : 201,
            message : "Create Product Successfully !🎉",
            products : data,
            success : true
        })
    } catch (error) {
        console.log(error)
    }   
}

//POST function for create product 
export async function POST(request:NextRequest) {
    try {
        await connectDB()
        const body = await request.json();
        const {title , price , description } = body;

        if(!title || !price || !description){
            return NextResponse.json({
                status : 400,
                message : "Please fill all fields",
                success : false
            })
        }
        const data = await productModel.create({title , price , description  })
        return NextResponse.json({
            status : 201,
            message : "Create Product Successfully !🎉",
            products : data,
            success : true
        })
    } catch (error) {
        console.error(error)
    }
}