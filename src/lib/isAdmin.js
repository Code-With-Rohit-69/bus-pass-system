import User from "@/models/User";
import { verifyToken } from "./auth";

export default async function isAdmin(token) {
  if (!token) {
    throw new Error("No token provided");
  }

  const decoded = await verifyToken(token);
  const userId = decoded.id;

  if (!userId) {
    throw new Error("Invalid token");
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  if (user.role !== "admin") {
    throw new Error("Access denied. Admin only.");
  }

  return;
}
