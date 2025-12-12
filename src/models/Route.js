import mongoose from "mongoose";

const routeSchema = new mongoose.Schema({
  routeName: {
    type: String,
    required: [true, "Route Name is Required."],
  },
  start: {
    type: String,
    required: [true, "Start of the route Name is Required."],
  },
  end: {
    type: String,
    required: [true, "End of the route Name is Required."],
  },
});

const Route = mongoose.models.routes || mongoose.model("Route", routeSchema);
export default Route;
