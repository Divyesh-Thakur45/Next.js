import connectDB from "@/lib/db";
import userModel from "@/models/user.model";
import { genSaltSync, hashSync } from "bcrypt-ts";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { email, password } = body;

    const isExist = await userModel.findOne({ email });
    if (isExist) {
      return NextResponse.json({
        status: 409,
        message: "Email already exists",
        success: false,
      });
    }

    const salt = genSaltSync(10);
    const hashPassword = hashSync(password, salt);

    const data = await userModel.create({ email, password: hashPassword });

    return NextResponse.json({
      status: 201,
      message: "Signup successful",
      signupData: data,
      success: true,
    });
  } catch (error) {
    console.log("Error in signup:", error);
    return NextResponse.json({
      status: 500,
      message: "Internal Server Error",
      error: error || "Unknown error",
      success: false,
    });
  }
}
