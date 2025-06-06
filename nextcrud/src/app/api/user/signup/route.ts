import userModel from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import connectDB from "@/_lib/mongodb";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { email, password } = body;
    const isExist = await userModel.findOne({ email });
    if (isExist) {
      return NextResponse.json({
        status: 400,
        message: "email is already exists",
        success: false,
      });
    }
    const hashPassword: string = await bcrypt.hash(password, 8);
    const userCreate = await userModel.create({
      email,
      password: hashPassword,
    });
    return NextResponse.json({
      status: 200,
      message: "Signup Successfully 🥳",
      user: userCreate,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
}
