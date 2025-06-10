import { withDB } from "@/_lib/withDB";
import { NextRequest, NextResponse } from "next/server";
import productModel from "@/models/Product";

const GetAll = async (
  _: NextRequest,
  { params }: { params: { userID: string } }
) => {
  try {
    if (!params.userID) {
      return NextResponse.json(
        { message: "Missing userID in params", success: false },
        { status: 400 }
      );
    }

    if (params.userID) {
      const data = await productModel.find({ userID: params.userID });

      return NextResponse.json({
        status: 200,
        message: "Products fetched successfully 🎉",
        success: true,
        products: data,
      });
    }
  } catch (error) {
    console.error("Error fetching products by userID:", error);
    return NextResponse.json({
      status: 500,
      message: "Server error",
      success: false,
    });
  }
};

export const GET = withDB(GetAll);
