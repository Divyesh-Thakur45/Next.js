import connectDB from "@/lib/db";
import addtocartModel from "@/models/addcart.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: { loginID: string } }
) {
  try {
    await connectDB();
    const { loginID } = context.params;

    const data = await addtocartModel.find({ loginID });

    if (data.length === 0) {
      return NextResponse.json({
        status: 404,
        message: "No data in cart",
        success: false,
      });
    }

    return NextResponse.json({
      status: 200,
      message: "Cart fetched successfully",
      cartData: data,
      success: true,
    });
  } catch (error) {
    console.error("Error in fetch one data:", error);
    return NextResponse.json({
      status: 500,
      message: "Server error",
      success: false,
    });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { loginID: string } }
) {
  try {
    await connectDB();

    const isDelete = await addtocartModel.findOne({ _id: params.loginID });
    if (!isDelete) {
      return NextResponse.json({
        status: 400,
        message: "don't have cat",
        success: false,
      });
    }

    const deleteData = await addtocartModel.findByIdAndDelete(params.loginID);
    return NextResponse.json({
      status: 200,
      message: "Deleted successfully",
      deleteData,
      success: true,
    });
  } catch (error) {
    console.error("Error in DELETE handler:", error);
    return NextResponse.json({
      status: 500,
      message: "Server error",
      success: false,
    });
  }
}
