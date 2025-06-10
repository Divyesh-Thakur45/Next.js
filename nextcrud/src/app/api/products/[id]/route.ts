import productModel from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import { withDB } from "@/_lib/withDB";

//GET function for get one product only
const GetOneHandler = async (
  _: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const isExist = await productModel.findById(params.id);
    if (!isExist) {
      return NextResponse.json({
        status: 400,
        message: "Don't have data",
        success: false,
      });
    }
    return NextResponse.json({
      status: 200,
      message: "Data get successfully 🎉",
      product: isExist,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// DELETE function for delete product
const DeleteHandler = async (
  _: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const isUser = await productModel.findById(params.id);
    if (!isUser) {
      return NextResponse.json({
        status: 400,
        message: "Don't have data",
        success: false,
      });
    }
    // 🧹 Delete associated image from disk
    if (isUser.image) {
      const imagePath = path.join(process.cwd(), "public", isUser.image); // image = /uploads/filename.jpg
      try {
        await fs.unlink(imagePath);
      } catch (err) {
        console.warn("Image not found or already deleted:", imagePath, err);
      }
    }

    const deletedUser = await productModel.findByIdAndDelete(params.id);
    return NextResponse.json({
      status: 200,
      message: "Data Deleted successfully 🎉",
      product: deletedUser,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

//PATCH function for updated product
const PatchHandler = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const formData = await request.formData();
    const file = formData.get("image") as File | null;
    const title = formData.get("title") as string;
    const price = formData.get("price") as string;
    const description = formData.get("description") as string;
    const flag = formData.get("flag") as string;

    const existingProduct = await productModel.findById(params.id);
    if (!existingProduct) {
      return NextResponse.json({
        status: 400,
        message: "Product not found",
        success: false,
      });
    }

    let newImagePath = existingProduct.image;

    // 🗑 If image is removed or updated
    if (file || flag == "true") {
      if (existingProduct.image) {
        const oldImagePath = path.join(
          process.cwd(),
          "public",
          "uploads",
          path.basename(existingProduct.image)
        );
        try {
          await fs.unlink(oldImagePath);
        } catch (err) {
          console.warn("Old image not found or already deleted:", err);
        }
      }

      // 📥 If a new file is uploaded
      if (file) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const uploadsDir = path.join(process.cwd(), "public", "uploads");

        await fs.mkdir(uploadsDir, { recursive: true });

        const sanitizedFileName = file.name.replace(/\s+/g, "-").toLowerCase();
        const uniqueFileName = `${Date.now()}-${sanitizedFileName}`;
        const filePath = path.join(uploadsDir, uniqueFileName);

        await fs.writeFile(filePath, buffer);

        newImagePath = `/uploads/${uniqueFileName}`;
      } else {
        newImagePath = "";
      }
    }

    const updatedProduct = await productModel.findByIdAndUpdate(
      params.id,
      {
        title,
        price,
        description,
        image: newImagePath,
      },
      { new: true }
    );

    return NextResponse.json({
      status: 200,
      message: "Product updated successfully 🎉",
      product: updatedProduct,
      success: true,
    });
  } catch (error) {
    console.error("PATCH error:", error);
    return NextResponse.json({
      status: 500,
      message: "Server error",
      success: false,
    });
  }
};

export const GET = withDB(GetOneHandler);
export const PATCH = withDB(PatchHandler);
export const DELETE = withDB(DeleteHandler);
