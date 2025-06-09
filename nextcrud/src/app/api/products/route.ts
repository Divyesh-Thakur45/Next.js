import connectDB from "@/_lib/mongodb";
import productModel from "@/models/Product";
import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";

// GET function for get all products
export async function GET() {
  try {
    await connectDB();
    const data = await productModel.find();
    return NextResponse.json({
      status: 201,
      message: "Create Product Successfully !🎉",
      products: data,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const formData = await request.formData();

    const file = formData.get("image") as File | null;
    const title = formData.get("title") as string;
    const price = formData.get("price") as string;
    const description = formData.get("description") as string;

    if (!title || !price || !description) {
      return NextResponse.json({
        status: 400,
        message: "Title, price, and description are required!",
        success: false,
      });
    }

    let imagePath: string | null = null;

    // If file exists, write it to disk
    if (file) {
      //       File {
      //   size: 5509,
      //   type: 'image/jpeg',
      //   name: 'cat4.jpg',
      //   lastModified: 1749446071771
      // }
      const bytes = await file.arrayBuffer();
      //       ArrayBuffer {
      //   [Uint8Contents]: <ff d8 ff e0 00 10 4a 46 49 46 00 01 01 00 00 01 00 01 00 00 ff db 00 84 00 09 06 07 13 12 12 15 13 12 13 15 16 15 17 18 18 1a 19 17 18 18 17 18 18 19 15 18 15 16 17 18 18 18 17 18 1f 28 20 18 1d 25 1b 15 17 21 31 21 25 29 2b 2e 2e 2e 18 1f 33 38 33 2c 37 28 2d 2e 2b 01 0a 0a 0a 0e 0d 0e 17 10 10 17 ... 10492 more bytes>,
      //   byteLength: 10592
      // }
      const buffer = Buffer.from(bytes);
      // <Buffer ff d8 ff e0 00 10 4a 46 49 46 00 01 01 00 00 01 00 01 00 00 ff db 00 84 00 09 06 07 13 12 12 15 12 12 12 15 16 15 17 17 17 15 15 15 15 17 16 15 15 17 ... 6382 more bytes>
      const filePath = `./public/uploads/${file.name}`;
      await writeFile(filePath, buffer);
      imagePath = `/uploads/${file.name}`;
    }

    const newProduct = await productModel.create({
      title,
      price,
      description,
      image: imagePath,
    });

    return NextResponse.json({
      status: 201,
      message: "Product created successfully 🎉",
      product: newProduct,
      success: true,
    });
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json({
      status: 500,
      message: "Server error",
      success: false,
    });
  }
}
