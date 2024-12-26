import { User } from "@/models";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();
  try {
    if (!email || !password) {
      return NextResponse.json(
        { error: "Please provide email and password" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "Algunos de los datos ingresados son incorrectos" },
        { status: 404 }
      );
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return NextResponse.json(
      { message: "Login successful", token },
      {
        status: 200,
        headers: {
          "Set-Cookie": `token=${token}; HttpOnly; Path=/; Secure; SameSite=Strict`,
        },
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: "Error logging in", message: error.message },
      { status: 500 }
    );
  }
}
