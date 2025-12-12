import { verifyToken } from "@/lib/auth";
import Pass from "@/models/Pass";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    const token = req.cookies.get("token")?.value;
    await isAdmin(token);

    const passes = await Pass.find()
      .populate("userId")
      .populate("routeId")
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      message: "Successfully fetched the Passes",
      passes,
    });
  } catch (error) {
    console.log(`Error in Fetching all the Passes of a User ${error.message}`);
    const status = error.message.includes("Access denied") ? 401 : 500;
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status,
      }
    );
  }
};

export const POST = async (req) => {
  try {
    const token = req.cookies.get("token")?.value;
    const decoded = verifyToken(token);
    const userId = decoded.id;

    const { routeId, passType } = await req.json();

    const newPass = new Pass({
      userId,
      routeId,
      passType,
    });

    await newPass.save();

    return NextResponse.json({
      success: true,
      message: "Pass applied successfully!",
      pass: newPass,
    });
  } catch (error) {
    console.log(`Error in Applying the Passes of a User ${error.message}`);
    const status = error.message.includes("Access denied") ? 401 : 500;
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status,
      }
    );
  }
};
