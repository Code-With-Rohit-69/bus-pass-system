import isAdmin from "@/lib/isAdmin";
import Route from "@/models/Route";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    const token = request.cookies.get("token")?.value;
    await isAdmin(token);

    const { routeName, start, end } = await request.json();

    const existingRoute = await Route.findOne({ routeName });

    if (existingRoute) {
      return NextResponse.json(
        {
          success: false,
          message: "Route already exists.",
        },
        {
          status: 409,
        }
      );
    }

    const route = new Route({
      routeName,
      start,
      end,
    });

    route.save();

    return NextResponse.json(
      {
        success: true,
        message: "Successfully saved new Route",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log(`Error in Adding Routes ${error.message}`);
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error.",
      },
      {
        status: 500,
      }
    );
  }
};

export const GET = async (request) => {
  try {
    const token = request.cookies.get("token")?.value;
    await isAdmin(token);

    const routes = await Route.find();

    return NextResponse.json(
      {
        success: true,
        message: "Successfully fetched all the routes.",
        routes,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(`Error in Fetching all the Routes ${error.message}`);
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
};
