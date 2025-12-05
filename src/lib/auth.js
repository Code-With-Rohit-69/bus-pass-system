import jwt, { verify } from "jsonwebtoken";

export const generateTokenAndSetCookie = (userId, response) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "7d",
  });

  response.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60,
    path: "/",
  });

  return response;
};

export const verifyToken = async (token) => {
  if (!token) {
    throw new Error("Token Not Provided");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(decoded);
    return decoded;
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};
