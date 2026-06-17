import jwt from "jsonwebtoken";
import { db } from "../db/db";


const JWT_SECRET = "secret_key";


export const authMiddleware = async (
  req: any,
  res: any,
  next: any
) => {

  if (
    req.path.includes("/login") ||
    req.path.includes("/register") ||
    req.path.includes("/verify")
  ) {
    return next();
  }


  const token = req.headers.authorization?.split(" ")[1];


  if (!token) {
    return res.status(401).json({
      message: "No token"
    });
  }


  try {

    const decoded: any = jwt.verify(
      token,
      JWT_SECRET
    );


    // PostgreSQL query
    const result = await db.query(
      "SELECT * FROM users WHERE id=$1",
      [decoded.id]
    );


    const user = result.rows[0];


    // IMPORTANT REQUIREMENT:
    // blocked/deleted user cannot continue
    if (!user || user.status === "blocked") {

      return res.status(403).json({
        message: "User blocked or not found"
      });

    }


    req.user = user;

    next();


  } catch (err) {

    return res.status(401).json({
      message: "Invalid token"
    });

  }
};