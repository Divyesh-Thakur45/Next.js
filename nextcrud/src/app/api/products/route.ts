import connectDB from "@/_lib/mongodb"
import productModel from "@/models/Post"
import { NextRequest, NextResponse } from "next/server"



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


export async function POST(requvest:NextRequest) {
    
    try {
        await connectDB()
        const body = await requvest.json();
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