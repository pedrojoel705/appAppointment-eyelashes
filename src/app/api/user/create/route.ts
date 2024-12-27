import { User } from "@/models";
import { NextRequest, NextResponse } from "next/server";

const normalizeText = (text: string) => {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .trim();
};

const roleMap = {
  client: "client",
  admin: "admin",
};

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, phonne, email, password } =
      await request.json();

    if (!firstName || !lastName || !phonne || !email || !password) {
      return NextResponse.json(
        { error: "Cannot create user, some data is missing" },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    const parseEmail = email.toLowerCase();
    const parseFirstName = normalizeText(firstName).toLowerCase();
    const parseLastName = normalizeText(lastName).toLowerCase();

    const newUser = new User({
      firstName: parseFirstName,
      lastName: parseLastName,
      phonne,
      email: parseEmail,
      password,
      role: roleMap.client,
    });

    await newUser.save();

    return NextResponse.json(
      { message: "User created successfully", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user", error);
    return NextResponse.json({ error: "Error creating user" }, { status: 500 });
  }
}
