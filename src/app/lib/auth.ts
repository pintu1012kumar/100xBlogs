// src/lib/auth.ts

import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "supersecretkey"; // Store real key in .env

export function generateToken(payload: object) {
  return jwt.sign(payload, SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, SECRET);
  } catch {
    return null;
  }
}
