import { connectDB } from "@/lib/db.js";
import User from "@/models/User.js";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    await connectDB();

    const { name, email, password, phone, collegeId, address } =
      await request.json();

    if (!name || !email || !password || !phone || !address) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, message: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    const emailNormalized = email.toLowerCase();
    const existingUser = await User.findOne({ email: emailNormalized });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "User already exists" },
        { status: 409 }
      );
    }

    const user = new User({
      name,
      email: emailNormalized,
      password,
      phone,
      collegeId: collegeId || "",
      address,
    });

    await user.save();

    return NextResponse.json(
      {
        success: true,
        message: "User registered successfully",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("Register Error:", error.message);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
