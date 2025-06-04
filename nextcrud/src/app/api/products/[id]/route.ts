import connectDB from "@/_lib/mongodb";
import productModel from "@/models/Post";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_: NextRequest, {params} : {params : {id : string}}){
    try {
        await connectDB()
        const isExist = await productModel.findById(params.id)
        if(!isExist){
            return NextResponse.json({
                status : 400,
                message : "Don't have data",
                success : false
            })
        }
        return NextResponse.json({
            status : 200,
            message : "Data get successfully 🎉",
            product : isExist,
            success : true
        })
    } catch (error) {
        console.log(error)
    }
}

export async function DELETE(_: NextRequest, {params} : {params : {id : string}}){
    try {
        await connectDB()
        const isUser = await productModel.findById(params.id)
        if(!isUser){
            return NextResponse.json({
                status : 400,
                message : "Don't have data",
                success : false
            })
        }
        const deletedUser = await productModel.findByIdAndDelete(params.id);
        return NextResponse.json({
                status : 200,
                message : "Data Deleted successfully 🎉",
                product : deletedUser,
                success : true
        })
    } catch (error) {
        console.log(error)
        
    }
}

export async function PATCH(requvest: NextRequest, {params} : {params : {id : string}}){
    try {
        await connectDB()
        const body = await requvest.json()
        const isUser = await productModel.findById(params.id)
        if(!isUser){
            return NextResponse.json({
                status : 400,
                message : "Don't have data",
                success : false
            })
        }
        const updatedData = await productModel.findByIdAndUpdate(params.id , body , {
            new : true
        })
         return NextResponse.json({
                status : 200,
                message : "Data updated successfully 🎉",
                product : updatedData,
                success : true
        })
    } catch (error) {
        console.log(error)
    }
}