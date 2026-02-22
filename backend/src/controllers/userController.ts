import type { Request, Response } from "express";
import * as queries from "../db/queries";
import { clerkClient, getAuth } from "@clerk/express";

export async function syncUser(req: Request, res: Response) {
  try {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).json({ error: "Unauthorized!" });

    const clerkUser = await clerkClient.users.getUser(userId);
    const email = clerkUser.emailAddresses[0]?.emailAddress;

    // Handle empty name case
    const rawName =
      `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim();
    const name = rawName || email || "Anonymous"; // Fallback chain

    const imageUrl = clerkUser.imageUrl;

    if (!email) {
      return res.status(400).json({ error: "User email not found in Clerk" });
    }

    const user = await queries.upsertUser({
      id: userId,
      email,
      name,
      imageUrl,
    });

    res.status(200).json(user);
  } catch (error) {
    console.error("Error syncing user: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
