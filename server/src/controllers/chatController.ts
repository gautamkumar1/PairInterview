import { streamClient } from "../utils/stream.js";
import type { Request, Response } from "express";

export const getStreamToken = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
  const token = streamClient.createToken(user.id)
  return res.status(200).json({
    token: token,
    user: user,
    success: true,
  });
  } catch (error) {
    console.error("Error getting stream token", error);
    return res.status(500).json({
      error: "Error getting stream token",
    });
  }
}