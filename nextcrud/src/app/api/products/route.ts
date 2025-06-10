import { withDB } from "@/_lib/withDB";
import productModel from "@/models/Product";
import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";

export const POST = withDB(async (request: NextRequest) => {
  try {
    const userHeader = request.cookies.get("x-user")?.value;
    if (!userHeader) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }
    const user = JSON.parse(userHeader);
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
      const bytes = await file.arrayBuffer();

      const buffer = Buffer.from(bytes);
      const uniqueFileName = `${Date.now()}-${file.name}`;
      const filePath = `./public/uploads/${uniqueFileName}`;
      await writeFile(filePath, buffer);
      imagePath = `/uploads/${file.name}`;
    }

    const newProduct = await productModel.create({
      title,
      price,
      description,
      image: imagePath,
      userID: user._id,
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
});
