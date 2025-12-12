import mongoose from "mongoose";

const passSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    routeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Route",
      required: true,
    },
    passType: {
      type: String,
      required: [true, "Pass Type required"],
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      required: true,
      default: "pending",
    },
    validityStart: {
      type: Date,
      default: Date.now,
    },
    validityEnd: {
      type: Date,
      default: null,
    },
  },
  { timeStamps: true }
);

const Pass = mongoose.models.Passes || mongoose.model("Pass", passSchema);
export default Pass;
