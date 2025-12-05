import { generateTokenAndSetCookie } from "@/lib/auth";
import { connectDB } from "@/lib/db.js";
import User from "@/models/User";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    await connectDB();
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "All Fields Required",
        },
        {
          status: 400,
        }
      );
    }

    const emailNormalized = email.toLowerCase();
    const user = await User.findOne({ email: emailNormalized });

    if (!user || !(await user.comparePassword(password))) {
      return NextResponse.json(
        { success: false, message: "Invalid Credentials" },
        { status: 401 }
      );
    }

    const response = NextResponse.json(
      {
        success: true,
        message: "Login Successfully",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      {
        status: 200,
      }
    );

    generateTokenAndSetCookie(user._id, response);

    return response;
  } catch (error) {
    console.log(`Error in login route ${error.message}`);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
};
