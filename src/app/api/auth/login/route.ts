import { mongoConnect } from "@/lib/mongoConnect";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET as string;
if (!JWT_SECRET) throw new Error("Please add JWT_SECRET in .env");

export async function POST(req: Request) {
  try {
    const { client, db } = await mongoConnect();
    const { email, password } = await req.json();

    if (!email || !password) {
      //   client.close();
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find user
    const user = await db.collection("users").findOne({ email });
    if (!user) {
      //   client.close();
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      //   client.close();
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id.toString(), email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    const res = NextResponse.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });

    // client.close()

    // Set cookie options
    res.cookies.set({
      name: "token",
      value: token,
      httpOnly: true, // cannot be accessed by JS
      path: "/", // cookie valid for all routes
      maxAge: 60 * 60 * 24, // 1 day in seconds
      sameSite: "strict", // security
      secure: process.env.NODE_ENV === "production",
    });

    return res;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
