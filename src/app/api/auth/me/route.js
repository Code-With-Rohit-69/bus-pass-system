import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db.js";
import User from "@/models/User";
import { verifyToken } from "@/lib/auth";

export const GET = async (req) => {
  try {
    await connectDB();

    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized: No token" },
        { status: 401 }
      );
    }

    // Verify token
    let decoded;
    try {
      decoded = verifyToken(token);
    } catch (error) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 401 }
      );
    }

    const user = await User.findById(decoded.id).select("-password"); 
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          phone: user.phone,
          collegeId: user.collegeId,
          address: user.address,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in /api/auth/me route:", error.message);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
