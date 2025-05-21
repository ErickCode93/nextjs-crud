import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json("");
}

export async function POST() {
  return NextResponse.json({
    message: "User created successfully",
  });
}

export async function PUT() {
  return NextResponse.json({ message: "User not found" }, { status: 404 });
}

export async function DELETE() {
  return NextResponse.json({ message: "User not found" }, { status: 404 });
}
