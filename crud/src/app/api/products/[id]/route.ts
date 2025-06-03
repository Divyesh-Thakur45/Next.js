import { NextResponse } from "next/server";
import { products } from "../../../../../db/data";


export async function GET(_:Request , {params} : {params : {id : string}}) {
   const product = await products.find((e)=>e?.id == parseInt(params?.id))
   if(!product){
    return NextResponse.json({
        status : 401,
        product : {},
        message : "Data Not found",
        success : false
    })
   }
   return NextResponse.json({
        status : 200,
        product,
        message : "Object get succeefully ! 🥳",
        success : true
   })
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
    // const id = parseInt();
    const index = products.findIndex((el) => el.id === parseInt(params.id));

    if (index === -1) {
        return NextResponse.json({
            status: 404,
            message: "Product not found",
            success: false,
        });
    }

    products.splice(index, 1); 

    return NextResponse.json({
        status: 200,
        message: "Data deleted successfully",
        success: true,
    });
}

export async function PATCH(request : Request,{params}:{params : {id : string}}) {
    const body = await request.json();
    const index = products.findIndex((e)=>e.id === parseInt(params.id))
    if (index === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
    products[index] = {...products[index],...body}
   return NextResponse.json({
        status: 200,
        message: "Updated Successfully 🎉",
        success: true,
        product: products[index], // Optional: Return updated product
    });
}