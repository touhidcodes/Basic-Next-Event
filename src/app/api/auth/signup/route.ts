import { mongoConnect } from "@/lib/mongoConnect";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET as string;
if (!JWT_SECRET) throw new Error("Please add JWT_SECRET in .env");

export async function POST(req: Request) {
  try {
    const { client, db } = await mongoConnect();
    const { username, email, password } = await req.json();

    if (!username || !email || !password) {
      //   client.close();
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // check if user already exists
    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      //   client.close();
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const result = await db.collection("users").insertOne({
      username,
      email,
      password: hashedPassword,
      role: "user",
      createdAt: new Date(),
    });

    // generate JWT
    const token = jwt.sign(
      { id: result.insertedId, email, role: "user" },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    const res = NextResponse.json(
      { message: "User registered", token },
      { status: 201 }
    );

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
