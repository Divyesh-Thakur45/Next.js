import userModel from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import connectDB from "@/_lib/mongodb";
import { withDB } from "@/_lib/withDB";
// getCookie

const LoginHandler = async (request: NextRequest) => {
  try {
    await connectDB();
    const body = await request.json();
    const { email, password } = body;
    const isExist = await userModel.findOne({ email });
    if (!isExist) {
      return NextResponse.json({
        status: 400,
        message: "Please signup first ⚠️",
        success: false,
      });
    }
    const comparePassword = await bcrypt.compare(password, isExist.password);
    if (!comparePassword) {
      return NextResponse.json({
        status: 400,
        message: "Password is incorrect ❌",
        success: false,
      });
    }
    const token = jwt.sign({ userData: isExist }, "zxcvbnm");
    // ✅ Set token in httpOnly cookie
    (await cookies()).set("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    return NextResponse.json({
      status: 200,
      message: "Login successfully 🎉",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const POST = withDB(LoginHandler);
