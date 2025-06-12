import connectDB from "@/lib/db";
import addtocartModel from "@/models/addcart.model";
import { NextRequest, NextResponse } from "next/server";

// ✅ GET handler to fetch cart data for a specific loginID
export async function GET(
  req: NextRequest,
  { params }: { params: { loginID: string } }
) {
  try {
    await connectDB();
    const { loginID } = params;

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
    console.error("Error in GET handler:", error);
    return NextResponse.json({
      status: 500,
      message: "Server error",
      success: false,
    });
  }
}

// ✅ DELETE handler to delete a specific cart item by its ID
export async function DELETE(
  req: NextRequest,
  { params }: { params: { loginID: string } }
) {
  try {
    await connectDB();
    const { loginID } = params;

    const isDelete = await addtocartModel.findOne({ _id: loginID });
    if (!isDelete) {
      return NextResponse.json({
        status: 400,
        message: "Cart item not found",
        success: false,
      });
    }

    const deleteData = await addtocartModel.findByIdAndDelete(loginID);
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
