import isAdmin from "@/lib/isAdmin.js";
import Pass from "@/models/Pass.js";

export const PATCH = async (req, { params }) => {
  try {
    const token = req.cookies.get("token")?.value;
    await isAdmin(token);

    const passId = params.id;
    console.log(passId);

    const pass = await Pass.findById(passId);
    if (!pass) {
      return NextResponse.json(
        {
          success: false,
          message: "Pass doesn't found.",
        },
        {
          status: 404,
        }
      );
    }

    const updatedPass = await Pass.findByIdAndUpdate(
      passId,
      {
        $set: {
          status: "approved",
          validityStart: new Date(),
          validityEnd: new Date(new Date().setMonth(new Date().getMonth() + 1)),
        },
      },
      { new: true }
    );

    return NextResponse.json(
      {
        success: true,
        message: "Approved Successfully!",
        pass: updatedPass,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(`Error in Approving the Pass ${error.message}`);
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
