import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const logout = (await cookies()).delete("token");
    return NextResponse.json({
      status: 200,
      message: "Logout successfully 👍",
      logout,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
}
