import { NextResponse } from "next/server"
import { products } from "../../../../db/data"





export async function GET() {
    if(products.length === 0){
        return NextResponse.json({
            status : 400,
            message : "No data you have !",
            products:[],
            success : false 
        })
    }
    return NextResponse.json({products,message : "Data get successfully", success : true , status : 200})
}

export async function POST(request : Request) {
    const body = await request.json()
    const newProduct = {id : products.length + 1, ...body}
    products.push(newProduct)
    return NextResponse.json({
        status : 201,
        message : "data created successfully 🥳",
        products ,
        success : true
    })
}