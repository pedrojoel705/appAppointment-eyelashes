import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { UserModel } from "@/models";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  await dbConnect();

  try {
    const token = await getToken({ 
      req: request, 
      secret: process.env.NEXTAUTH_SECRET 
    });

    if (!token || !token.id) {
      return NextResponse.json(
        { error: "Unauthorized: No token provided" },
        { status: 401 }
      );
    }

    const user = await UserModel.findById(token.id);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error: any) {
    console.error("Error in GET /api/user:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
