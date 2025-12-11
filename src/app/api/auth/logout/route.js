import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    const response = NextResponse.json(
      {
        success: true,
        message: "Logout Successfully",
      },
      { status: 200 }
    );

    response.cookies.set("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0,
      path: "/",
      expires: new Date(0),
    });

    return response;
  } catch (error) {
    console.log(`Error in Logout Route ${error.message}`);
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error.",
      },
      { status: 500 }
    );
  }
};
