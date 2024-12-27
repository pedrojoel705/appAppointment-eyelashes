import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { NextRequest } from "next/server";

import { jwtVerify } from "jose";
import { User } from "@/models";
import { IUserPayload } from "@/interface/IUserPayload";

export async function GET(request: NextRequest, response: NextResponse) {
  await dbConnect();

  try {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized: No token provided" },
        { status: 401 }
      );
    }

    const { payload }: { payload: IUserPayload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );

    if (!payload || !payload.userId) {
      return NextResponse.json(
        { error: "Invalid token payload" },
        { status: 401 }
      );
    }

    const user = await User.findById(payload.userId);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error: any) {
    console.error("Error in GET /api/user:", error);

    // Manejo de errores
    if (error.name === "JsonWebTokenError") {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
