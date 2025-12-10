import { NextRequest, NextResponse } from "next/server";
import { PrivyClient } from "@privy-io/server-auth";

/**
 * Protected API route demonstrating Privy token verification
 * Requires Bearer token in Authorization header
 */
export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const token = authHeader.replace("Bearer ", "");
    const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID;
    const appSecret = process.env.PRIVY_APP_SECRET;

    if (!appId || !appSecret) {
      throw new Error("Privy credentials not configured");
    }

    const privy = new PrivyClient(appId, appSecret);
    const claims = await privy.verifyAuthToken(token);

    return NextResponse.json({
      message: "Authorized",
      userId: claims.userId,
    });
  } catch (e) {
    console.error("Token verification error:", e);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
